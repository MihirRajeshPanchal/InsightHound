from aihounds.models.product import ProductRequest, ProductMongo
from aihounds.constants.hound import mongo_client
from aihounds.services.product import generate_product
from fastapi import APIRouter

router = APIRouter()

@router.post("/product_compare")
async def get_product_compare(request: ProductRequest):
    company_data = mongo_client.read("company", request.id)
    product_data = mongo_client.read_by_key_value("product", "unique_id" ,request.id+"_"+request.product_name)
    if product_data:
        return product_data[0]["product"]
    else:
        product = generate_product(
            company=company_data["name"],
            product=request.product_name,
        )
        mongo_client.create("product", ProductMongo(unique_id=request.id+"_"+request.product_name, product=product))
        return product