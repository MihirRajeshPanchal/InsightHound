from fastapi import FastAPI, HTTPException, Query, APIRouter
from typing import List, Optional
import requests
from urllib.parse import urlencode
from dotenv import load_dotenv

router = APIRouter()

import os

APOLLO_BASE_URL = "https://api.apollo.io/api/v1/mixed_companies/search"
APOLLO_API_KEY = os.getenv("APOLLO_API_KEY")


# @router.post("/search-companies/")
def search_companies(
    num_employees_ranges: List[str] = Query(default=["1,10"]),
    locations: List[str] = Query(default=["texas"]),
    keyword_tags: Optional[List[str]] = Query(default=None),
):

    query_params = {
        "organization_num_employees_ranges[]": num_employees_ranges,
        "organization_locations[]": locations,
    }
    if keyword_tags:
        query_params["q_organization_keyword_tags[]"] = keyword_tags

    url = f"{APOLLO_BASE_URL}?{urlencode(query_params, doseq=True)}"

    headers = {
        "accept": "application/json",
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
        "x-api-key": APOLLO_API_KEY,
    }

    response = requests.post(url, headers=headers)

    if response.status_code != 200:
        raise HTTPException(
            status_code=response.status_code,
            detail=f"Error from Apollo API: {response.text}",
        )

    try:
        data = response.json()
        accounts = data.get("organizations")
        if accounts:
            company_data=[
                {
                    "name": a["name"],
                    "linkedin_url": a["linkedin_url"],
                    "website_url": a["website_url"],
                    "logo_url": a["logo_url"],
                }
                for a in accounts
            ]
            return company_data
        else:
           raise HTTPException(status_code=404, detail="Try Changing Your Search Parameters")
    except requests.exceptions.JSONDecodeError:
        raise HTTPException(
            status_code=500, detail="Invalid JSON response from Apollo API"
        )

