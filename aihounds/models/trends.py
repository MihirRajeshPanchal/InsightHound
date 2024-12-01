from pydantic import BaseModel, Field
from typing import List

class Coordinates(BaseModel):
    lat: float
    lng: float

class RegionInterest(BaseModel):
    coordinates: Coordinates
    location: str
    max_value_index: int
    value: str
    extracted_value: int

class InterestByRegionData(BaseModel):
    interest_by_region: List[RegionInterest]
    
class TrendsQueryRequest(BaseModel):
    query: str
    geo: str = Field(default="IN")