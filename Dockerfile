# Multi-stage build for RMR Dashboard
FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci --only=production

COPY frontend/ ./
RUN npm run build

# Backend stage
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy backend requirements and install Python dependencies
COPY backend/requirements.txt ./backend/
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy backend code
COPY backend/ ./backend/

# Copy frontend build
COPY --from=frontend-builder /app/frontend/build ./frontend/build

# Copy data
COPY data/ ./data/

# Create a simple static file server for the frontend
RUN pip install aiofiles

# Create startup script
RUN echo '#!/bin/bash\n\
cd /app/backend\n\
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 &\n\
cd /app/frontend\n\
python -m http.server 3000 --directory build\n\
wait' > /app/start.sh && chmod +x /app/start.sh

EXPOSE 8000 3000

CMD ["/app/start.sh"] 