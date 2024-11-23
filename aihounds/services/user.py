
from aihounds.constants.hound import mongo_client
from fastapi.encoders import jsonable_encoder

class UserService():
    def __init__(self):
        self.mongo_client =mongo_client

    def get_rivals(self,user_id):
        user_data=self.mongo_client.read("user",user_id)
        if user_data is None:
            return {"message":"User not found"}
        else:
            company_id=user_data.get("companyId",None)
            print(f"Company ID: {company_id}")
            if company_id is None:
                return {"message":"User has no company"}
            company_data=self.mongo_client.read_by_key_value("rivals","companyId",company_id)
            if company_data is None:
                return {"message":"Company not found"}
            else:
                for company in company_data:
                    company['companyId']=str(company['companyId'])
                return company_data
    

