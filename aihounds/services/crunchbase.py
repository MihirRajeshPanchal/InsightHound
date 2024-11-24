from calendar import c
import requests
from aihounds.models.crunchbase import CrunchBaseCompany
from aihounds.models.user import User
from aihounds.models.company import Company
from aihounds.models.rivals import Rival
from aihounds.repository.repository import MongoDBClient
from aihounds.constants.hound import mongo_client
import concurrent.futures
import os
import json
from typing import List
from fastapi import BackgroundTasks
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

                # print(f"Company: {company}")
                return company
            except Exception as e:
                print(f"Error: {e}")
                return None
            
    def get_company_details_self(self,id:str,background_tasks:BackgroundTasks)->CrunchBaseCompany:
        try:
            user = self.mongoclient.read("user",id)
            company_id = user.get('companyId')
            company = self.mongoclient.read("company",company_id)
            rival_names = set()
            if company.get("props",None) is not None:
                data=company['props']['org_similarity_list']
                for item in data:
                    if 'target' in item and 'permalink' in item['target']:
                        
                        rival_names.add(item['target']['permalink'])
                
                print("Rival names:", list(rival_names))
                rival_names=list(rival_names)
                rival_names=rival_names[:3]
            
            if company.get("props",None) is not None:
                del company['props']['org_similarity_list']
                return company
            else:
                print("ELSE")
                data=self.get_company_details(company['name'].lower()
                )
                self.mongoclient.update("company",company_id,{"props" : data.model_dump()})
                company = self.mongoclient.read("company",company_id)
            rival_names = set()
            if company.get("props",None) is not None:
                data=company['props']['org_similarity_list']
                for item in data:
                    if 'target' in item and 'permalink' in item['target']:
                        
                        rival_names.add(item['target']['permalink'])
                
                print("Rival names:", list(rival_names))
                rival_names=list(rival_names)
                rival_names=rival_names[:3]
                for permalink in rival_names:
                    background_tasks.add_task(self.create_rivals_data, permalink, company_id)
            company = self.mongoclient.read("company",company_id)
            del company['props']['org_similarity_list']
            return company
        except Exception as e:
            print(f"Error: {e}")
            return None


    def create_rivals_data(self,company:str,companyId:str):
        try:
            data=self.get_company_details(company)
            self.mongoclient.create("rivals",Rival(companyId=companyId,props=data.model_dump()))
        except Exception as e:
            print(f"Error: {e}")
            return None