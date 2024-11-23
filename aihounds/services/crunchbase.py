from calendar import c
import requests
from aihounds.models.crunchbase import CrunchBaseCompany
from aihounds.models.user import User
from aihounds.models.company import Company
from aihounds.repository.repository import MongoDBClient
from aihounds.constants.hound import mongo_client
import os
import json

class CrunchBaseService:
    def __init__(self):
        self.api_key =os.getenv('APIFY_KEY') 
        self.url=f'https://api.apify.com/v2/acts/curious_coder~crunchbase-url-scraper/run-sync-get-dataset-items?token={self.api_key}'
        self.mongoclient=mongo_client

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
            user = self.mongoclient.read("user",id)
            company_id = user.get('companyId')
            company = self.mongoclient.read("company",company_id)
            print(f"Company: {company}")
            if company.get("props",None) is not None:
                return company
            else:
                print("ELSE")
                data=self.get_company_details(company['name'].lower()
                )
                self.mongoclient.update("company",company_id,{"props" : data.model_dump()})
            company = self.mongoclient.read("company",company_id)
            return company
        except Exception as e:
            print(f"Error: {e}")
            return None