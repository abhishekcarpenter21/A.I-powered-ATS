from database.database import engine
from models.job_openings import JobDescription

JobDescription.metadata.create_all(bind=engine)

from fastapi import FastAPI
from routes.home_route import router as home_route
from routes.match_route import router as match_route
from routes.apply_route import router as application_route
from routes.job_route import router as job_route
from models.users import User
from routes.auth_route import router as auth_route
from routes.dashboard_route import router as dashboard_router
from fastapi.middleware.cors import CORSMiddleware
from routes.resumeview_route import router as resume_router
from routes.userdetails_route import router as userdetails_router
from routes.login_route import router as login_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(home_route)
app.include_router(match_route)
app.include_router(application_route)
app.include_router(job_route)
app.include_router(auth_route)
app.include_router(dashboard_router)
app.include_router(resume_router)
app.include_router(userdetails_router)
app.include_router(login_router)


