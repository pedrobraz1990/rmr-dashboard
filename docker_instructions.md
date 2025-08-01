# 🐳 Docker Deployment Instructions

## For Sharing Your RMR Dashboard

### Option A: Share Docker Image (Easiest for Recipients)

1. **Build the Docker image:**
   ```bash
   docker build -t rmr-dashboard .
   ```

2. **Save the image to a file:**
   ```bash
   docker save rmr-dashboard > rmr-dashboard.tar
   ```

3. **Share the file** (`rmr-dashboard.tar`) with your colleague

4. **Recipient loads and runs:**
   ```bash
   docker load < rmr-dashboard.tar
   docker run -p 3000:3000 -p 8000:8000 rmr-dashboard
   ```

### Option B: Share Source Code + Docker (Recommended)

1. **Share your entire project folder** (including Dockerfile and docker-compose.yml)

2. **Recipient runs:**
   ```bash
   docker-compose up --build
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

### Option C: Push to Docker Hub (Most Professional)

1. **Tag your image:**
   ```bash
   docker tag rmr-dashboard yourusername/rmr-dashboard:latest
   ```

2. **Push to Docker Hub:**
   ```bash
   docker push yourusername/rmr-dashboard:latest
   ```

3. **Share the image name** with your colleague

4. **Recipient runs:**
   ```bash
   docker run -p 3000:3000 -p 8000:8000 yourusername/rmr-dashboard:latest
   ```

## Benefits of Docker Deployment

✅ **No setup required** - Everything is pre-configured  
✅ **Consistent environment** - Works the same everywhere  
✅ **Easy to share** - Single file or command  
✅ **Professional** - Industry standard deployment method  
✅ **Scalable** - Can be deployed to cloud services  

## Troubleshooting

- **Port conflicts**: Change ports in docker-compose.yml
- **Data updates**: Mount the data directory as a volume
- **Performance**: Docker runs slightly slower than native, but more reliable 