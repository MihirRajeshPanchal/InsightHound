import requests
from aihounds.models.crunchbase import CrunchBaseCompany
from aihounds.models.user import User
from aihounds.models.company import Company
from aihounds.repository.mongo import MongooseRepository
import os
import json
class CrunchBaseService:
    def __init__(self):
        self.api_key =os.getenv('APIFY_KEY') 
        self.url=f'https://api.apify.com/v2/acts/curious_coder~crunchbase-url-scraper/run-sync-get-dataset-items?token={self.api_key}'
        self.UserRepository=MongooseRepository(User,'user')
        self.CompanyRepository=MongooseRepository(Company,'company')

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
            
    def get_company_details_self(self,id:str)->CrunchBaseCompany:
        try:
            company = self.UserRepository.find_company_name_by_user_id(id)
            print(f"Company: {company}")
            if company['props'] and company['props'] is not None:
                 return json.loads(company['props'])
            else:
                print("ELSE")
                data=self.get_company_details(company['name'].lower()
                )
                
                self.CompanyRepository.append_to_props(company['_id'],data.dict())
        except Exception as e:
            print(f"Error: {e}")
            return None
        


