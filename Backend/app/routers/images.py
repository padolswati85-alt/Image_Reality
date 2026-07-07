# app/routers/images.py
from fastapi import APIRouter, UploadFile, File

router = APIRouter(prefix="/images", tags=["Images"])

@router.post("/upload")
def upload_image(file: UploadFile = File(...)):
    # here you can write file to disk under app/static if you want
    return {"filename": file.filename}
