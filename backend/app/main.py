"""
Main FastAPI application for ESG Dashboard
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn

# Import routers
from app.controllers import data_controller

app = FastAPI(
    title="ESG Dashboard API",
    description="API for ESG consulting dashboard with interactive data visualization",
    version="1.0.0"
)

# Configure CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React development server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(data_controller.router, prefix="/api/data", tags=["data"])

@app.get("/")
async def root():
    """Root endpoint"""
    return {"message": "ESG Dashboard API is running"}

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "ESG Dashboard API"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 