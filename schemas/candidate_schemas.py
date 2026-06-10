from pydantic import BaseModel

class CandidateCreate(BaseModel):

    name: str
    email: str
    phone: str