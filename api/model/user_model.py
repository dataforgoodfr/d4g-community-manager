from pydantic import BaseModel
from typing import Dict, Any, Optional

class User(BaseModel):
    email: str
    attributes: Dict[str, Any]
