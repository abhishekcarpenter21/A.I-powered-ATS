from fastapi import APIRouter, UploadFile, File, Form
from services.pdf_reader import extract_text_from_pdf_file
from services.similarity import calculate_match_score
from typing import Optional

router = APIRouter()

@router.post("/match-resume")
async def match_resume(
    resume: UploadFile = File(...),
    job_description: Optional[str] = Form(None) ,
    job_description_File: Optional[UploadFile ]= File(None)
):

    resume_text = extract_text_from_pdf_file(resume.file)

    if job_description_File:

        jd_text = extract_text_from_pdf_file(job_description_File.file)
        

    elif job_description:

        jd_text = job_description


    

    else:
        return {
            "error": "Please provide either JD PDF or JD text"
        }
    


    score = calculate_match_score(
        resume_text,
        jd_text
    )

    return {
        "resume_file": resume.filename,
        "match_score": score
        
        
    }