
from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def home():
    return{
        "message": "Ai resume analyzer"
    }

