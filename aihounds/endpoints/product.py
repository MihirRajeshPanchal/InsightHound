from aihounds.models.product import ProductRequest
from aihounds.constants.hound import mongo_client
from aihounds.services.product import generate_product
from fastapi import APIRouter

router = APIRouter()

@router.post("/product_compare")
async def get_product_compare(request: ProductRequest):
    company_data = mongo_client.read("company", request.id)
    product = generate_product(
        company=company_data["name"],
        product=request.product_name,
    )
    return product