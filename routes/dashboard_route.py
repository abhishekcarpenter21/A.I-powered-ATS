from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.database import SessionLocal

from models.job_openings import JobDescription
from models.all_applications import Application
from models.shortlist import Shortlist

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/dashboard")
def get_dashboard(
    db: Session = Depends(get_db)
):

    total_jobs = db.query(
        JobDescription
    ).count()

    total_applications = db.query(
        Application
    ).count()

    shortlisted = db.query(
        Shortlist
    ).count()

    rejected = db.query(
        Application
    ).filter(
        Application.status == "REJECTED"
    ).count()

    return {
        "total_jobs": total_jobs,
        "total_applications": total_applications,
        "shortlisted": shortlisted,
        "rejected": rejected
    }

@router.get("/applications")
def get_all_applications(
    db: Session = Depends(get_db)
):

    applications = db.query(
        Application
    ).all()

    return applications

@router.get("/count")
def count_applications(
    db: Session = Depends(get_db)
):
    return {
        "count": db.query(Application).count()
    }