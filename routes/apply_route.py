from fastapi import APIRouter, Form, File, UploadFile, Depends
from sqlalchemy.orm import Session

from database.database import SessionLocal
from models.shortlist import Shortlist
from models.job_openings import JobDescription

from services.pdf_reader import extract_text_from_pdf_file
from services.similarity import calculate_match_score
from services.email_service import send_rejection_email , send_shortlisted_email
from models.all_applications import Application
from services.skills_service import get_skill_analysis
from schemas.userdetails_schemas import ApplicationDetailsResponse

import os
 
router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/apply")
async def apply_job(
    name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    job_id: int = Form(...),
    resume: UploadFile = File(...),
    db: Session = Depends(get_db)
):


    job = db.query(JobDescription).filter(
        JobDescription.id == job_id
    ).first()

    if not job:
        return {
            "message": "Job not found"
        }
    
    UPLOAD_FOLDER = "uploads"

    os.makedirs(
       UPLOAD_FOLDER,
       exist_ok=True
)

    resume_path = os.path.join(
        UPLOAD_FOLDER,
        resume.filename
)

    content = await resume.read()

    with open(resume_path, "wb") as file:
       file.write(content)

    
    resume_text = extract_text_from_pdf_file(
        resume.file
    )

    
    job_description = job.job_description

    
    score = calculate_match_score(
        resume_text,
        job_description
    )
    

    matched_skills, missing_skills = get_skill_analysis(
    resume_text,
    job_description
    )

    
    if score >= job.threshold:

        Shortlist_candidate = Shortlist(
            name=name,
            email=email,
            phone=phone,
            resume_path=resume_path
        )

        db.add(Shortlist_candidate)
        db.commit()
        db.refresh(Shortlist_candidate)

        send_shortlisted_email(
         email=email,
         candidate_name=name,
         job_title=job.job_title
        )

        status = "SHORTLISTED"

    else:

        status = "REJECTED"

        send_rejection_email(
            email=email,
            candidate_name=name,
            job_title=job.job_title
        )



    application = Application(
    candidate_name=name,
    email=email,
    phone=phone,
    job_description_id=job.id,
    match_score=score,
    status=status,
    resume_path=resume_path,
    matched_skills=",".join(matched_skills),
    missing_skills=",".join(missing_skills)
    )
    

    db.add(application)
    db.commit()
    db.refresh(application)

    return {
        "name": name,
        "email": email,
        "job_title": job.job_title,
        "message": "Application submitted successfully. You will receive an email regarding your application status within 24 hours."
}
    
