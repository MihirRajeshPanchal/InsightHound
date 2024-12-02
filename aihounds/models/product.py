from pydantic import BaseModel
from typing import List, Optional
from pydantic import BaseModel

class ProductRequest(BaseModel):
    id: str
    product_name: str
    
class ProductReview(BaseModel):
    reviewer_name: Optional[str] = None
    reviewer_rating: Optional[float] = None
    reviewer_comment: Optional[str] = None

class Product(BaseModel):
    company_name: Optional[str] = None
    product_name: Optional[str] = None
    product_pricing: Optional[str] = None
    product_reviews: List[ProductReview] = []
