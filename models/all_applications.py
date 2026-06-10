from sqlalchemy import Column, Integer, String, Float

from database.database import Base


class Application(Base):

    __tablename__ = "all_applications"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    candidate_name = Column(
        String,
        nullable=False
    )

    email = Column(
        String,
        nullable=False
    )

    phone = Column(
        String,
        nullable=False
    )

    job_description_id = Column(
        Integer,
        nullable=False
    )

    match_score = Column(
        Float,
        nullable=False
    )

    status = Column(
        String,
        nullable=False
    )

    resume_path = Column(
    String,
    nullable=True
    )

    matched_skills = Column(
    String,
    nullable=True
    )

    missing_skills = Column(
    String,
    nullable=True
    )