#!/usr/bin/env python3
"""
Simple test script to debug server startup
"""
import sys
import traceback

try:
    print("Testing imports...")
    from fastapi import FastAPI
    print("✓ FastAPI imported")
    
    from app.main import app
    print("✓ App imported successfully")
    
    import uvicorn
    print("✓ Uvicorn imported")
    
    print("Starting server...")
    uvicorn.run(app, host="0.0.0.0", port=8000)
    
except Exception as e:
    print(f"Error: {e}")
    print("Traceback:")
    traceback.print_exc()
    sys.exit(1) 