# from fastapi import APIRouter
# from schemas.login_schemas import LoginRequest

# router = APIRouter()

# @router.post("/login")
# def login(user: LoginRequest):

#     if (
#         user.email == "hr@smtlabs.com"
#         and
#         user.password == "admin123"
#     ):
#         return {
#             "access_token": "hr_token",
#             "role": "HR"
#         }

#     return {
#         "message": "Invalid Credentials"
#     }


from sqlalchemy.orm import Session
from fastapi import Depends , APIRouter

from database.database import SessionLocal
from models.users import User
from schemas.login_schemas import LoginRequest
from services.auth_service import verify_password

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/login")
def login(
    user: LoginRequest,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not existing_user:
        return {
            "message": "User not found"
        }

  
    if not verify_password(
    user.password,
    existing_user.password
):
      return {
        "message": "Invalid password"
    }

    return {
        "access_token": "dummy_token",
        "role": existing_user.role,
        "name": existing_user.name
    }