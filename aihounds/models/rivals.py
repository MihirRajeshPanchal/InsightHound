from pydantic import BaseModel
from typing import Any, Optional

class Rival(BaseModel):
    companyId: Any
    props:Optional[Any]=None