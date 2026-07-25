import os
import ssl
from dotenv import load_dotenv

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# ===========================
# Load Environment Variables
# ===========================
load_dotenv()

DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT", "4000")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_NAME = os.getenv("DB_NAME")

# ===========================
# SSL Certificate
# ===========================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

CA_CERT = os.path.abspath(
    os.path.join(BASE_DIR, "..", "certs", "isrgrootx1.pem")
)

print("=" * 60)
print("DB_HOST:", DB_HOST)
print("CA_CERT:", CA_CERT)
print("Certificate Exists:", os.path.exists(CA_CERT))
print("=" * 60)

# ===========================
# SSL Context
# ===========================
ssl_ctx = ssl.create_default_context(cafile=CA_CERT)

# ===========================
# Database URL
# ===========================
DATABASE_URL = (
    f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}"
    f"@{DB_HOST}:{DB_PORT}/{DB_NAME}"
)

# ===========================
# SQLAlchemy Engine
# ===========================
engine = create_engine(
    DATABASE_URL,
    connect_args={
        "ssl": ssl_ctx
    },
    pool_pre_ping=True,
    pool_recycle=300,
)

# ===========================
# Session
# ===========================
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# ===========================
# Base
# ===========================
Base = declarative_base()

# ===========================
# Dependency
# ===========================
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()