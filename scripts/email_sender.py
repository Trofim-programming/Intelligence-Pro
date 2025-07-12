import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from datetime import datetime

class EmailService:
    """Service for sending emails"""
    
    def __init__(self):
        self.smtp_server = "smtp.gmail.com"
        self.smtp_port = 587
        self.email = os.getenv("EMAIL_ADDRESS", "your-email@gmail.com")
        self.password = os.getenv("EMAIL_PASSWORD", "your-app-password")
    
    def send_contact_notification(self, form_data):
        """Send notification about new contact form submission"""
        try:
            msg = MIMEMultipart()
            msg['From'] = self.email
            msg['To'] = "info@intelligencepro.ru"
            msg['Subject'] = f"Новая заявка от {form_data['name']}"
            
            body = f"""
            Новая заявка с сайта Intelligence Pro:
            
            Имя: {form_data['name']}
            Телефон: {form_data['phone']}
            Email: {form_data['email']}
            
            Сообщение:
            {form_data['message']}
            
            Время: {datetime.now().strftime('%d.%m.%Y %H:%M:%S')}
            """
            
            msg.attach(MIMEText(body, 'plain', 'utf-8'))
            
            server = smtplib.SMTP(self.smtp_server, self.smtp_port)
            server.starttls()
            server.login(self.email, self.password)
            server.send_message(msg)
            server.quit()
            
            print(f"✅ Email sent successfully for {form_data['name']}")
            return True
            
        except Exception as e:
            print(f"❌ Failed to send email: {str(e)}")
            return False

if __name__ == "__main__":
    # Test email service
    email_service = EmailService()
    
    test_data = {
        'name': 'Тест Тестов',
        'phone': '+7 999 123-45-67',
        'email': 'test@example.com',
        'message': 'Тестовое сообщение для проверки работы email сервиса'
    }
    
    result = email_service.send_contact_notification(test_data)
    print(f"Test result: {'Success' if result else 'Failed'}")
