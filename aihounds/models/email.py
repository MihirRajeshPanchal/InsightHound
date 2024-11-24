from pydantic import BaseModel

class Email(BaseModel):
    subject: str
    email_template: str
    
class EmailRequest(BaseModel):
    id: str
    array: list[str]