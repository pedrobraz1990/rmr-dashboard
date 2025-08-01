#!/bin/bash

echo "🚀 Setting up ESG Dashboard Project..."

# Create virtual environment for Python backend
echo "📦 Setting up Python backend..."
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd ..

# Setup React frontend
echo "⚛️ Setting up React frontend..."
cd frontend
npm install
cd ..

echo "✅ Setup complete!"
echo ""
echo "To start the backend:"
echo "  cd backend"
echo "  source venv/bin/activate"
echo "  uvicorn app.main:app --reload"
echo ""
echo "To start the frontend (in a new terminal):"
echo "  cd frontend"
echo "  npm start"
echo ""
echo "Backend will run on: http://localhost:8000"
echo "Frontend will run on: http://localhost:3000" 