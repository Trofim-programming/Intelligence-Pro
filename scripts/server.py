from flask import Flask, request, jsonify, render_template_string
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from datetime import datetime
import json
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Configuration
class Config:
    SMTP_SERVER = "smtp.gmail.com"
    SMTP_PORT = 587
    EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS", "your-email@gmail.com")
    EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD", "your-app-password")
    RECIPIENT_EMAIL = os.getenv("RECIPIENT_EMAIL", "info@intelligencepro.ru")

config = Config()

class ContactFormHandler:
    """Handles contact form submissions and email sending"""
    
    def __init__(self, config):
        self.config = config
    
    def validate_form_data(self, data):
        """Validate form data"""
        required_fields = ['name', 'phone', 'email', 'message']
        errors = []
        
        for field in required_fields:
            if not data.get(field) or not data[field].strip():
                errors.append(f"Поле '{field}' обязательно для заполнения")
        
        # Email validation
        email = data.get('email', '').strip()
        if email and '@' not in email:
            errors.append("Некорректный email адрес")
        
        # Phone validation
        phone = data.get('phone', '').strip()
        if phone and len(phone) < 10:
            errors.append("Некорректный номер телефона")
        
        # Message length validation
        message = data.get('message', '').strip()
        if message and len(message) < 10:
            errors.append("Сообщение должно содержать минимум 10 символов")
        
        return errors
    
    def send_email(self, form_data):
        """Send email notification"""
        try:
            # Create message
            msg = MIMEMultipart()
            msg['From'] = self.config.EMAIL_ADDRESS
            msg['To'] = self.config.RECIPIENT_EMAIL
            msg['Subject'] = f"Новая заявка с сайта Intelligence Pro от {form_data['name']}"
            
            # Email body
            body = f"""
            Получена новая заявка с сайта Intelligence Pro:
            
            Имя: {form_data['name']}
            Телефон: {form_data['phone']}
            Email: {form_data['email']}
            
            Сообщение:
            {form_data['message']}
            
            Дата отправки: {datetime.now().strftime('%d.%m.%Y %H:%M:%S')}
            """
            
            msg.attach(MIMEText(body, 'plain', 'utf-8'))
            
            # Send email
            server = smtplib.SMTP(self.config.SMTP_SERVER, self.config.SMTP_PORT)
            server.starttls()
            server.login(self.config.EMAIL_ADDRESS, self.config.EMAIL_PASSWORD)
            text = msg.as_string()
            server.sendmail(self.config.EMAIL_ADDRESS, self.config.RECIPIENT_EMAIL, text)
            server.quit()
            
            logger.info(f"Email sent successfully for {form_data['name']}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to send email: {str(e)}")
            return False
    
    def save_to_file(self, form_data):
        """Save form data to JSON file for backup"""
        try:
            filename = f"contacts_{datetime.now().strftime('%Y%m')}.json"
            
            # Add timestamp to form data
            form_data['timestamp'] = datetime.now().isoformat()
            
            # Load existing data or create new list
            try:
                with open(filename, 'r', encoding='utf-8') as f:
                    contacts = json.load(f)
            except FileNotFoundError:
                contacts = []
            
            # Add new contact
            contacts.append(form_data)
            
            # Save updated data
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(contacts, f, ensure_ascii=False, indent=2)
            
            logger.info(f"Contact data saved to {filename}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to save contact data: {str(e)}")
            return False

# Initialize form handler
form_handler = ContactFormHandler(config)

@app.route('/')
def index():
    """Serve the main HTML page"""
    try:
        with open('index.html', 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        return "HTML file not found", 404

@app.route('/api/contact', methods=['POST'])
def handle_contact():
    """Handle contact form submissions"""
    try:
        # Get JSON data from request
        data = request.get_json()
        
        if not data:
            return jsonify({
                'success': False,
                'message': 'Нет данных для обработки'
            }), 400
        
        # Validate form data
        errors = form_handler.validate_form_data(data)
        if errors:
            return jsonify({
                'success': False,
                'message': '; '.join(errors)
            }), 400
        
        # Save to file (backup)
        form_handler.save_to_file(data)
        
        # Send email notification
        email_sent = form_handler.send_email(data)
        
        if email_sent:
            return jsonify({
                'success': True,
                'message': 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.'
            })
        else:
            return jsonify({
                'success': True,
                'message': 'Заявка принята! Мы свяжемся с вами в ближайшее время.'
            })
    
    except Exception as e:
        logger.error(f"Error handling contact form: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'Произошла ошибка при обработке заявки'
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'service': 'Intelligence Pro API'
    })

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Get basic statistics"""
    try:
        # Count contacts from current month
        filename = f"contacts_{datetime.now().strftime('%Y%m')}.json"
        contact_count = 0
        
        try:
            with open(filename, 'r', encoding='utf-8') as f:
                contacts = json.load(f)
                contact_count = len(contacts)
        except FileNotFoundError:
            pass
        
        return jsonify({
            'contacts_this_month': contact_count,
            'server_uptime': datetime.now().isoformat(),
            'status': 'active'
        })
    
    except Exception as e:
        logger.error(f"Error getting stats: {str(e)}")
        return jsonify({'error': 'Failed to get stats'}), 500

class TelegramBotSimulator:
    """Simulate Telegram bot functionality for demo purposes"""
    
    def __init__(self):
        self.responses = {
            'greeting': [
                'Привет! Я бот Intelligence Pro. Как дела?',
                'Здравствуйте! Чем могу помочь?',
                'Добро пожаловать! Расскажите о вашем проекте.'
            ],
            'services': [
                'Мы создаем чат-ботов с ИИ, e-commerce ботов и системы автоматизации.',
                'Наши услуги включают разработку умных ботов для любых задач.',
                'Специализируемся на интеграции с ChatGPT, Claude и другими ИИ.'
            ],
            'pricing': [
                'Стоимость зависит от сложности проекта. Базовый бот от 50,000 руб.',
                'Предоставляем бесплатную консультацию и оценку проекта.',
                'Цены начинаются от 50,000 руб. за простого бота.'
            ]
        }
    
    def get_response(self, message_type='greeting'):
        """Get a random response for the given message type"""
        import random
        responses = self.responses.get(message_type, self.responses['greeting'])
        return random.choice(responses)

bot_simulator = TelegramBotSimulator()

@app.route('/api/bot/demo', methods=['POST'])
def bot_demo():
    """Demo endpoint for bot simulation"""
    try:
        data = request.get_json()
        user_message = data.get('message', '').lower()
        
        # Simple keyword matching
        if any(word in user_message for word in ['привет', 'hello', 'здравствуй']):
            response = bot_simulator.get_response('greeting')
        elif any(word in user_message for word in ['услуги', 'сервис', 'что делаете']):
            response = bot_simulator.get_response('services')
        elif any(word in user_message for word in ['цена', 'стоимость', 'сколько']):
            response = bot_simulator.get_response('pricing')
        else:
            response = "Интересный вопрос! Для подробной консультации свяжитесь с нашими специалистами."
        
        return jsonify({
            'success': True,
            'response': response,
            'timestamp': datetime.now().isoformat()
        })
    
    except Exception as e:
        logger.error(f"Bot demo error: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'Ошибка в работе бота'
        }), 500

if __name__ == '__main__':
    # Create necessary directories
    os.makedirs('static', exist_ok=True)
    os.makedirs('templates', exist_ok=True)
    
    print("🤖 Intelligence Pro Server Starting...")
    print("📧 Email notifications configured")
    print("💾 File backup system ready")
    print("🔗 API endpoints available:")
    print("   - POST /api/contact - Contact form")
    print("   - GET /api/health - Health check")
    print("   - GET /api/stats - Statistics")
    print("   - POST /api/bot/demo - Bot demo")
    print("\n🚀 Server running on http://localhost:5000")
    
    app.run(debug=True, host='0.0.0.0', port=5000)
