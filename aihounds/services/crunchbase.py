import requests
from aihounds.models.crunchbase import CrunchBaseCompany
import os

class CrunchBaseService:
    def __init__(self):
        self.api_key =os.getenv('APIFY_KEY') 
        self.url=f'https://api.apify.com/v2/acts/curious_coder~crunchbase-url-scraper/run-sync-get-dataset-items?token={self.api_key}'

    def get_company_details(self,company_name:str)->CrunchBaseCompany:
            try:
                payload={"urls":[f"https://www.crunchbase.com/organization/{company_name}"]}

                response = requests.post(self.url,json=payload)
                data = response.json()
                print(f"Data: {data}")
                data=data[0]
                company = CrunchBaseCompany(**data)

                print(f"Company: {company}")
                return company
            except Exception as e:
                print(f"Error: {e}")
                return None
            

