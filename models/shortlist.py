from sqlalchemy import Column, Integer, String

from database.database import Base


class Shortlist(Base):

    __tablename__ = "shortlist_candidates"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String,
        nullable=False
    )

    email = Column(
        String,
        nullable=False
    )

    phone = Column(
        Integer,
        nullable=False
    )

    resume_path = Column(
        String,
        nullable=False
    )