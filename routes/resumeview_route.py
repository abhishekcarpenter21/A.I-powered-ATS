from fastapi.responses import FileResponse
from fastapi import APIRouter, Depends
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from database.database import SessionLocal
from models.shortlist import Shortlist
from models.all_applications import Application
import os 

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

router = APIRouter()

@router.get("/resume/{application_id}")
def view_resume(
    application_id: int,
    db: Session = Depends(get_db)
):

    application = db.query(
        Application
    ).filter(
        Application.id == application_id
    ).first()



    if not application:
       return {
        "message": "Application not found"
    }

    if not application.resume_path:
       return {
        "message": "Resume not found for this application"
    }

    return FileResponse(
    application.resume_path,
    filename=os.path.basename(application.resume_path)
)


@router.get("/resume/view/{application_id}")
def view_resume_pdf(
    application_id: int,
    db: Session = Depends(get_db)
):

    application = db.query(
        Application
    ).filter(
        Application.id == application_id
    ).first()

    if not application:
        return {
            "message": "Application not found"
        }

    if not application.resume_path:
        return {
            "message": "Resume not found"
        }

    return FileResponse(
        application.resume_path,
        media_type="application/pdf"
    )