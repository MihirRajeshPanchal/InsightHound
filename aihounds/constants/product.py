from langchain_core.prompts import ChatPromptTemplate

PRODUCT_TEMPLATE = ChatPromptTemplate.from_template("""
Analyze the following company name and product name and create a rival product comparison data using this structure:
{{
    {{
        "company_name" : "",
        "product_name" : "",
        "product_pricing" : "",
        "product_features" : [
            "",
            "",
            "",
            ""
        ],
        "product_reviews" : [
            {{
                "reviewer_rating" : "",
                "reviewer_comment" : ""
            }}
        ], 
    }}
}}

Company content:
{company}

Product content:
{product}

Guidelines:
- For the given company name and product name, analyze the rival products and create a comparison data.
- The comparison data should include the pricing features and reviews of the rival products.
- The product features should be the key features of the product which are distinguishable.
- The first object of the json should be of the company name and product name I gave you and likewise next 3 objects will be of the rival companies.
- There should be 4 objects in total. 1 for the company name and product name I gave you and 3 for the rival companies.
"""
)

