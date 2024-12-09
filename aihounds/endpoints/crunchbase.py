from aihounds.services.crunchbase import CrunchBaseService
from fastapi import APIRouter,BackgroundTasks
from aihounds.services.outreach import get_self
from fastapi import Request
crunchbase_router= APIRouter()
crunchbase_service=CrunchBaseService()



@crunchbase_router.get("/company/{company_name}")
def get_company_details(company_name:str):
    return crunchbase_service.get_company_details(company_name)


@crunchbase_router.get("/self/{id}")
def get_company_details_self(id:str,background_tasks: BackgroundTasks):
    print("id",id)
    return crunchbase_service.get_company_details_self(id,background_tasks)


@crunchbase_router.post("/v2/self/{id}")
async def get_company_details_self_v2(id:str,data:Request):
    data=await data.json()
    url=data['linkedin_url']
    res=get_self(id,url)
    if res:
        return {"message":"Added successfully"}
    else:
        return {"message":"Failed to add"}