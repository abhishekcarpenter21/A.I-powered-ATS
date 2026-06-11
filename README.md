# AI-Powered Applicant Tracking System (ATS)

## Overview

AI-Powered Applicant Tracking System (ATS) is a recruitment automation platform designed to streamline the hiring process. The system enables HR teams to create job openings, receive candidate applications, automatically analyze resumes using AI-based matching, shortlist suitable candidates, and manage the recruitment workflow through an interactive dashboard.

---

## Features

### Candidate Portal

* View available job openings
* Apply for jobs
* Upload resumes in PDF format
* Receive automated application status emails

### AI Resume Screening

* Resume text extraction
* Job description matching
* AI-powered match score calculation
* Automatic shortlisted/rejected decision based on threshold
* Matched Skills Detection
* Missing Skills Detection

### HR Dashboard

* Secure Login System
* Create Job Openings
* Delete Job Openings
* View All Applications
* Search & Filter Candidates
* View Candidate Details
* View Resume
* Download Resume
* Track Match Scores
* View Shortlisted Candidates
* Dashboard Analytics

### Email Automation

* Shortlisted Candidate Notification
* Rejection Notification
* Automated Email Sending

---

## Technology Stack

### Frontend

* React.js
* JavaScript
* CSS

### Backend

* FastAPI
* Python

### Database

* SQLite
* SQLAlchemy ORM

### AI / NLP

* TF-IDF Vectorization
* Cosine Similarity
* Skill Matching Engine

### Authentication

* JWT Authentication
* Password Hashing (bcrypt)

### Email Service

* SMTP
* Gmail Integration

---

## System Workflow

Job Creation
↓
Candidate Application
↓
Resume Upload
↓
Resume Parsing
↓
AI Match Score Generation
↓
Skill Analysis
↓
Threshold Evaluation
↓
Shortlist / Reject
↓
Email Notification
↓
HR Dashboard Management

---

## Project Structure

resume_analyzer/

├── candidate-portal/

├── hr-dashboard/

├── database/

├── models/

├── routes/

├── schemas/

├── services/

├── uploads/

├── app.py

├── requirements.txt

└── README.md

---

## Key Modules

### Resume Analyzer

Extracts text from uploaded resumes and compares it with job descriptions using NLP techniques.

### Skill Matching Engine

Identifies:

* Matched Skills
* Missing Skills

### HR Management

Provides complete candidate tracking and recruitment management.

### Authentication Module

Manages secure login and role-based access.

---

## API Endpoints

### Authentication

POST /auth/register

POST /auth/login

### Jobs

GET /jobs

POST /jobs

DELETE /jobs/{id}

### Applications

POST /apply

GET /dashboard/applications

### Resume

GET /resume/{application_id}

### Dashboard

GET /dashboard/dashboard

---

## Future Enhancements

* Multi-Company Support
* Interview Scheduling
* AI Interview Assistant
* Candidate Ranking
* Advanced Analytics Dashboard
* Employee Management System
* Learning Management System
* Mentor Portal
* AI Agents for HR Automation
* Cloud Deployment

---

## Author

Abhishek Carpenter

Python Full Stack Developer


---

## License

This project is developed for educational and portfolio purposes.
