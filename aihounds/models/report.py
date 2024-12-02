from pydantic import BaseModel

class HTMLReport(BaseModel):
    html_content: str

class ReportRequest(BaseModel):
    id: str
