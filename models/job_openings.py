from sqlalchemy import Column, Integer, String, Text

from database.database import Base

class JobDescription(Base):

    __tablename__ = "job_descriptions"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    job_title = Column(
        String,
        nullable=False
    )

    job_description = Column(
        Text,
        nullable=False
    )

    threshold = Column(
        Integer,
        default=70
    )