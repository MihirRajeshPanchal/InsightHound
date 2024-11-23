from pydantic import BaseModel
from typing import Any, Optional
from bson import ObjectId
class Rival(BaseModel):
    companyId: Any
    props:Optional[Any]=None