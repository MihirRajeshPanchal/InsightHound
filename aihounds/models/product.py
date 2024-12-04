from pydantic import BaseModel
from typing import List, Optional
from pydantic import BaseModel

    
class ProductReview(BaseModel):
    reviewer_rating: Optional[float] = None
    reviewer_comment: Optional[str] = None

class Product(BaseModel):
    company_name: Optional[str] = None
    product_name: Optional[str] = None
    product_pricing: Optional[str] = None
    product_features: List[str]
    product_reviews: List[ProductReview] = []

class ProductMongo(BaseModel):
    unique_id: str
    product: list
    
class ProductRequest(BaseModel):
    id: str
    product_name: str