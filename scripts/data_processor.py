import json
import csv
from datetime import datetime, timedelta
import matplotlib.pyplot as plt
import pandas as pd

class ContactDataProcessor:
    """Process and analyze contact form data"""
    
    def __init__(self, data_file=None):
        self.data_file = data_file or f"contacts_{datetime.now().strftime('%Y%m')}.json"
    
    def load_contacts(self):
        """Load contacts from JSON file"""
        try:
            with open(self.data_file, 'r', encoding='utf-8') as f:
                return json.load(f)
        except FileNotFoundError:
            print(f"File {self.data_file} not found")
            return []
    
    def export_to_csv(self, output_file=None):
        """Export contacts to CSV file"""
        contacts = self.load_contacts()
        
        if not contacts:
            print("No contacts to export")
            return
        
        output_file = output_file or f"contacts_export_{datetime.now().strftime('%Y%m%d')}.csv"
        
        with open(output_file, 'w', newline='', encoding='utf-8') as csvfile:
            fieldnames = ['name', 'phone', 'email', 'message', 'timestamp']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            
            writer.writeheader()
            for contact in contacts:
                writer.writerow(contact)
        
        print(f"✅ Exported {len(contacts)} contacts to {output_file}")
    
    def generate_statistics(self):
        """Generate statistics from contact data"""
        contacts = self.load_contacts()
        
        if not contacts:
            print("No data available for statistics")
            return
        
        # Basic statistics
        total_contacts = len(contacts)
        
        # Contacts by day
        daily_counts = {}
        for contact in contacts:
            date = contact['timestamp'][:10]  # Extract date part
            daily_counts[date] = daily_counts.get(date, 0) + 1
        
        # Email domains analysis
        email_domains = {}
        for contact in contacts:
            domain = contact['email'].split('@')[1] if '@' in contact['email'] else 'unknown'
            email_domains[domain] = email_domains.get(domain, 0) + 1
        
        print(f"📊 Contact Statistics:")
        print(f"Total contacts: {total_contacts}")
        print(f"Contacts by day: {daily_counts}")
        print(f"Top email domains: {sorted(email_domains.items(), key=lambda x: x[1], reverse=True)[:5]}")
        
        return {
            'total': total_contacts,
            'daily': daily_counts,
            'domains': email_domains
        }
    
    def create_charts(self):
        """Create visualization charts"""
        contacts = self.load_contacts()
        
        if not contacts:
            print("No data available for charts")
            return
        
        # Prepare data
        dates = []
        for contact in contacts:
            date = datetime.fromisoformat(contact['timestamp']).date()
            dates.append(date)
        
        # Create DataFrame
        df = pd.DataFrame({'date': dates})
        daily_counts = df.groupby('date').size()
        
        # Create chart
        plt.figure(figsize=(12, 6))
        plt.plot(daily_counts.index, daily_counts.values, marker='o')
        plt.title('Заявки по дням')
        plt.xlabel('Дата')
        plt.ylabel('Количество заявок')
        plt.xticks(rotation=45)
        plt.tight_layout()
        
        chart_file = f"contacts_chart_{datetime.now().strftime('%Y%m%d')}.png"
        plt.savefig(chart_file)
        print(f"📈 Chart saved as {chart_file}")
        
        plt.show()

def main():
    """Main function to demonstrate data processing"""
    processor = ContactDataProcessor()
    
    print("🔄 Processing contact data...")
    
    # Generate statistics
    stats = processor.generate_statistics()
    
    # Export to CSV
    processor.export_to_csv()
    
    # Create charts (uncomment if matplotlib is available)
    # processor.create_charts()
    
    print("✅ Data processing completed!")

if __name__ == "__main__":
    main()
