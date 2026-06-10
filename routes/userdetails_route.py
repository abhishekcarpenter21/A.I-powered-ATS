



from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.database import SessionLocal
from models.all_applications import Application

router = APIRouter(
    prefix="/userdetails",
    tags=["User Details"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/applications/{application_id}")
def get_application_details(
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

    return application