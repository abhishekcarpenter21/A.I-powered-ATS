from pydantic import BaseModel

class JobCreate(BaseModel):

    job_title: str
    job_description: str
    threshold: int