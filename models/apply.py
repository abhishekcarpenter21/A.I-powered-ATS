from sqlalchemy import Column, Integer, String, Float

from database.database import Base


class Apply(Base):

    __tablename__ = "apply"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    candidate_id = Column(
        Integer,
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