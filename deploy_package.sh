#!/bin/bash

echo "📦 Creating RMR Dashboard Deployment Package..."

# Create deployment directory
DEPLOY_DIR="RMR_Dashboard_Deployment_$(date +%Y%m%d)"
mkdir -p "$DEPLOY_DIR"

# Copy essential files
echo "📋 Copying project files..."
cp -r backend "$DEPLOY_DIR/"
cp -r frontend "$DEPLOY_DIR/"
cp -r data "$DEPLOY_DIR/"
cp README.md "$DEPLOY_DIR/"
cp setup.sh "$DEPLOY_DIR/"
cp TECH_STACK.md "$DEPLOY_DIR/"

# Remove unnecessary files to reduce size
echo "🧹 Cleaning up unnecessary files..."
rm -rf "$DEPLOY_DIR/backend/venv"
rm -rf "$DEPLOY_DIR/frontend/node_modules"
rm -rf "$DEPLOY_DIR/.git"

# Create quick start script
cat > "$DEPLOY_DIR/quick_start.sh" << 'EOF'
#!/bin/bash
echo "🚀 Quick Start for RMR Dashboard"
echo "=================================="
echo ""
echo "1. Make setup script executable:"
echo "   chmod +x setup.sh"
echo ""
echo "2. Run the setup:"
echo "   ./setup.sh"
echo ""
echo "3. Start the backend (Terminal 1):"
echo "   cd backend"
echo "   source venv/bin/activate"
echo "   uvicorn app.main:app --reload"
echo ""
echo "4. Start the frontend (Terminal 2):"
echo "   cd frontend"
echo "   npm start"
echo ""
echo "5. Open browser to: http://localhost:3000"
echo ""
echo "Backend API: http://localhost:8000"
echo "Frontend: http://localhost:3000"
EOF

chmod +x "$DEPLOY_DIR/quick_start.sh"

# Create a simple README for the package
cat > "$DEPLOY_DIR/DEPLOYMENT_README.md" << 'EOF'
# RMR Dashboard - Deployment Package

## Quick Start
1. Run: `chmod +x setup.sh && ./setup.sh`
2. Follow the instructions in `quick_start.sh`

## What's Included
- ✅ Backend (FastAPI + Python)
- ✅ Frontend (React + Bootstrap)
- ✅ Sample data (TestData.xlsx)
- ✅ Setup scripts
- ✅ Documentation

## Requirements
- Python 3.8+
- Node.js 14+
- npm or yarn

## Support
If you encounter issues, check the main README.md for detailed instructions.
EOF

# Create zip file
echo "📦 Creating zip package..."
zip -r "${DEPLOY_DIR}.zip" "$DEPLOY_DIR"

echo "✅ Deployment package created: ${DEPLOY_DIR}.zip"
echo "📁 Package size: $(du -sh "${DEPLOY_DIR}.zip" | cut -f1)"
echo ""
echo "🎯 To share:"
echo "   1. Send the zip file: ${DEPLOY_DIR}.zip"
echo "   2. Recipient extracts and runs: ./setup.sh" 