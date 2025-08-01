# 🚀 RMR Dashboard - Cloud Deployment Guide

This guide will help you deploy your RMR Dashboard to the cloud for free using Vercel (frontend) and Railway (backend).

## 📋 Prerequisites

- GitHub account
- Railway account (free)
- Vercel account (free)

## 🎯 Step-by-Step Deployment

### Step 1: Deploy Backend to Railway

#### 1.1 Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Click "Start a New Project"
3. Sign up with your GitHub account

#### 1.2 Deploy from GitHub
1. Click "Deploy from GitHub repo"
2. Select your RMR Dashboard repository
3. Set **Root Directory** to: `backend`
4. Click "Deploy"

#### 1.3 Wait for Deployment
- Railway will automatically:
  - Install Python dependencies
  - Copy the data file
  - Start the FastAPI server
- This takes 2-3 minutes

#### 1.4 Get Backend URL
1. Once deployed, click on your project
2. Go to "Settings" tab
3. Copy the **Domain** URL (e.g., `https://rmr-backend-xxxxx.up.railway.app`)
4. **Save this URL** - you'll need it for the frontend!

### Step 2: Deploy Frontend to Vercel

#### 2.1 Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account

#### 2.2 Deploy from GitHub
1. Click "New Project"
2. Import your RMR Dashboard repository
3. Set **Root Directory** to: `frontend`
4. Click "Deploy"

#### 2.3 Configure Environment Variables
1. In Vercel dashboard, go to your project
2. Click "Settings" → "Environment Variables"
3. Add new variable:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: `https://your-railway-backend-url.up.railway.app/api/data`
   - **Environment**: Production
4. Click "Save"

#### 2.4 Redeploy
1. Go to "Deployments" tab
2. Click "Redeploy" on the latest deployment
3. This will apply the environment variable

### Step 3: Test Your Deployment

#### 3.1 Test Backend
1. Visit your Railway URL + `/docs`
   - Example: `https://rmr-backend-xxxxx.up.railway.app/docs`
2. You should see the FastAPI documentation
3. Test an endpoint like `/api/data/summary`

#### 3.2 Test Frontend
1. Visit your Vercel URL
2. The dashboard should load with all charts
3. Test navigation between tabs
4. Verify data is loading from the backend

## 🔧 Troubleshooting

### Backend Issues
- **Data not loading**: Check if `TestData.xlsx` is in the `backend/data/` folder
- **Port issues**: Railway automatically sets the `PORT` environment variable
- **Dependencies**: Check `requirements.txt` is in the backend folder

### Frontend Issues
- **API errors**: Verify `REACT_APP_API_URL` is set correctly in Vercel
- **Build errors**: Check console for React build issues
- **Routing issues**: The `vercel.json` should handle React Router

### CORS Issues
If you see CORS errors, the backend should already be configured to allow all origins in production.

## 📱 Sharing with Your Colleague

Once deployed, you can share:

1. **Frontend URL**: `https://your-app.vercel.app`
2. **No setup required** - just click the link!
3. **Works on any device** - desktop, tablet, mobile

## 🔄 Updating the Deployment

### Backend Updates
1. Push changes to GitHub
2. Railway automatically redeploys

### Frontend Updates
1. Push changes to GitHub
2. Vercel automatically redeploys

### Data Updates
1. Replace `backend/data/TestData.xlsx`
2. Push to GitHub
3. Railway will redeploy with new data

## 💰 Cost

- **Railway**: Free tier (500 hours/month)
- **Vercel**: Free tier (unlimited)
- **Total cost**: $0

## 🎉 Success!

Your colleague can now access your dashboard by simply clicking a link - no technical setup required!

---

**Need help?** Check the Railway and Vercel documentation, or the error logs in their dashboards. 