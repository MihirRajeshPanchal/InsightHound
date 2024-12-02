from calendar import c
from aihounds.models.report import ReportRequest
from aihounds.constants.hound import mongo_client
from aihounds.services.report import generate_pdf
from fastapi import APIRouter


router = APIRouter()


@router.post("/report_generate")
def get_report(request: ReportRequest):
    try:
        company_details = mongo_client.read("company", request.id)
        if not company_details:
            company_details = "Company details not found"
            print("Company details not found")
        
        product_comparison = mongo_client.read_by_key_value("product", "unique_id", request.id + "_" + request.product_name)
        if not product_comparison:
            product_comparison = "Product comparison not found"
            print("Product comparison not found")
        
        market_segment = mongo_client.read_by_key_value("segment", "id", request.id)
        if not market_segment:
            market_segment = "Market segment not found"
            print("Market segment not found")
        
        market_research = mongo_client.read_by_key_value("questionnaire", "id", request.id)
        if not market_research:
            market_research = "Market research not found"
            print("Market research not found")
        
        kanban_board = mongo_client.read_by_key_value("kanban", "id" ,request.id)
        if not kanban_board:
            kanban_board = "Kanban board not found"
            print("Kanban board not found")
            
        if all([company_details, product_comparison, market_segment, market_research, kanban_board]):
            print("All data fetched successfully. Generating PDF...")
            response = generate_pdf(
                company_details=company_details,
                product_comparison=product_comparison,
                market_segment=market_segment,
                market_research=market_research,
                kanban_board=kanban_board
            )
            response["html_content"] = response["html_content"].replace("\n", "<br/>")
            return response
        else:
            print("Some data is missing.")
            return {"message": "Data not found"}
    except Exception as e:
        print(f"Error occurred: {str(e)}")
        return {"error": str(e)}