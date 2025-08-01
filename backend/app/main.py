"""
Main FastAPI application for ESG Dashboard
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
import os

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
    allow_origins=[
        "http://localhost:3000",  # React development server
        "https://rmr-dashboard.vercel.app",  # Vercel frontend
        "https://*.vercel.app",  # Any Vercel subdomain
        "https://*.railway.app"  # Any Railway subdomain
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(data_controller.router, prefix="/api/data", tags=["data"])

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "ESG Dashboard API is running", 
        "status": "healthy",
        "port": os.environ.get('PORT', 'unknown'),
        "environment": os.environ.get('RAILWAY_ENVIRONMENT', 'unknown')
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "ESG Dashboard API"}

@app.get("/test")
async def test_endpoint():
    """Simple test endpoint that doesn't depend on data files"""
    return {
        "message": "Test endpoint working", 
        "timestamp": "2024-01-01",
        "port": os.environ.get('PORT', 'unknown')
    }

@app.get("/debug")
async def debug_info():
    """Debug information for troubleshooting"""
    return {
        "port": os.environ.get('PORT', 'unknown'),
        "environment": os.environ.get('RAILWAY_ENVIRONMENT', 'unknown'),
        "working_directory": os.getcwd(),
        "files": os.listdir('.') if os.path.exists('.') else []
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 