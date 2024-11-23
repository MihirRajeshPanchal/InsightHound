from pydantic import BaseModel
from typing import List, Optional

class Segment(BaseModel):
    segment: str
    unit_size: Optional[str]
    urgency: Optional[str]
    utilization: Optional[str]
    benefit: Optional[str]
    segment_income: Optional[str]
    potential_one_time_revenue: Optional[str]
    potential_continuous_revenue_stream: Optional[str]
    potential_beachhead: Optional[str]
    market_share: Optional[str]
    growth_rate: Optional[str]
    competition_index: Optional[str]
    customer_acquisition_cost: Optional[str]
    lifetime_value: Optional[str]
    profit_margin: Optional[str]

class MarketSegmentSchema(BaseModel):
    segments: List[Segment]
    
class MarketSegmentMongoSchema(BaseModel):
    id: str
    segments: List[Segment]