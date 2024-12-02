from aihounds.models.product import ProductRequest, ProductMongo
from aihounds.constants.hound import mongo_client
from aihounds.services.product import generate_product
from fastapi import APIRouter

router = APIRouter()

@router.post("/product_compare")
async def get_product_compare(request: ProductRequest):
    company_data = mongo_client.read("company", request.id)
    product_data = mongo_client.read_by_key_value("product", "unique_id" ,request.id)
    if product_data:
        for i in product_data:
            print(i["product"][0]["product_name"])
            if i["product"][0]["product_name"] == request.product_name:
                return i["product"]
        else:
            product = generate_product(
                company=company_data["name"],
                product=request.product_name,
            )
            mongo_client.create("product", ProductMongo(unique_id=request.id, product=product))
            return product
    else:
        product = generate_product(
            company=company_data["name"],
            product=request.product_name,
        )
        mongo_client.create("product", ProductMongo(unique_id=request.id, product=product))
        return product