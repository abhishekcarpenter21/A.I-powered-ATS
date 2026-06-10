from pydantic import BaseModel


class ApplicationCreate(BaseModel):

    candidate_id: int
    job_description_id: int