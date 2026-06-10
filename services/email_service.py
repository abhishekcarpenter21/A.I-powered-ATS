import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

from dotenv import load_dotenv

load_dotenv()

EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")

def send_rejection_email(
    email,
    candidate_name,
    job_title
):

    subject = "Application Status Update"

    body = f"""
Dear {candidate_name},

Thank you for applying for the position of {job_title}.

After reviewing your application and comparing your profile with the job requirements, we found that your current skills and experience do not sufficiently match the requirements for this role.

We appreciate your interest in our organization and encourage you to apply for future opportunities that align with your skills and experience.

Regards,
Recruitment Team
"""

    try:

        msg = MIMEMultipart()

        msg["From"] = EMAIL_ADDRESS
        msg["To"] = email
        msg["Subject"] = subject

        msg.attach(
            MIMEText(body, "plain")
        )

        server = smtplib.SMTP(
            "smtp.gmail.com",
            587
        )

        server.starttls()

        server.login(
            EMAIL_ADDRESS,
            EMAIL_PASSWORD
        )

        server.send_message(msg)

        server.quit()

        print("Email sent successfully")

    except Exception as e:

        print("Email Error:", e)


def send_shortlisted_email(
    email,
    candidate_name,
    job_title
):

    subject = "Application Shortlisted"

    body = f"""
Dear {candidate_name},

Congratulations!

We are pleased to inform you that your profile has been shortlisted for the position of {job_title}.

After reviewing your application, we found that your skills and experience closely match the requirements of this role.

The HR/Recruitment team will review your application and contact you shortly regarding the next steps in the hiring process.

Thank you for your interest in our organization.

Best Regards,
Recruitment Team
"""

    try:

        msg = MIMEMultipart()

        msg["From"] = EMAIL_ADDRESS
        msg["To"] = email
        msg["Subject"] = subject

        msg.attach(
            MIMEText(body, "plain")
        )

        server = smtplib.SMTP(
            "smtp.gmail.com",
            587
        )

        server.starttls()

        server.login(
            EMAIL_ADDRESS,
            EMAIL_PASSWORD
        )

        server.send_message(msg)

        server.quit()

        print("Shortlisted email sent successfully")

    except Exception as e:

        print("Email Error:", e)