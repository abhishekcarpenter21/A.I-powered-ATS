

from pydantic import BaseModel


class ApplicationDetailsResponse(BaseModel):
    id: int
    candidate_name: str
    email: str
    phone: str
    job_description_id: int
    match_score: float
    status: str
    resume_path: str | None = None
    matched_skills: str | None = None
    missing_skills: str | None = None

    class Config:
        from_attributes = True