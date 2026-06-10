from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.database import SessionLocal
from models.job_openings import JobDescription
from schemas.job_openings_schemas import JobCreate

router = APIRouter(prefix="/jobs", tags=["Jobs"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/")
def create_job(
    job: JobCreate,
    db: Session = Depends(get_db)
):

    new_job = JobDescription(
        job_title=job.job_title,
        job_description=job.job_description,
        threshold=job.threshold
    )

    db.add(new_job)
    db.commit()
    db.refresh(new_job)

    return {
        "message": "Job created successfully",
        "job_id": new_job.id
    }


@router.get("/")
def get_all_jobs(
    db: Session = Depends(get_db)
):

    jobs = db.query(JobDescription).all()

    return jobs


@router.get("/{job_id}")
def get_job(
    job_id: int,
    db: Session = Depends(get_db)
):

    job = db.query(JobDescription).filter(
        JobDescription.id == job_id
    ).first()

    if not job:
        return {
            "message": "Job not found"
        }

    return job

from fastapi import HTTPException

@router.delete("/{job_id}")
def delete_job(
    job_id: int,
    db: Session = Depends(get_db)
):

    job = db.query(
        JobDescription
    ).filter(
        JobDescription.id == job_id
    ).first()

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job not found"
        )

    db.delete(job)
    db.commit()

    return {
        "message": "Job deleted successfully"
    }