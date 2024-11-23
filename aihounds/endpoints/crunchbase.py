from aihounds.services.crunchbase import CrunchBaseService
from fastapi import APIRouter,BackgroundTasks


crunchbase_router= APIRouter()
crunchbase_service=CrunchBaseService()



@crunchbase_router.get("/company/{company_name}")
def get_company_details(company_name:str):
    return crunchbase_service.get_company_details(company_name)


@crunchbase_router.get("/self/{id}")
def get_company_details_self(id:str,background_tasks: BackgroundTasks):
    return crunchbase_service.get_company_details_self(id,background_tasks)