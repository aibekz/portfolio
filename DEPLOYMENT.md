# Deployment Guide - NviAxis Full-Stack Application

This guide will walk you through deploying your full-stack application using Render for the backend and Netlify for the frontend.

## Prerequisites

- GitHub account with your code pushed
- MongoDB Atlas account (for database)
- Render account (for backend)
- Netlify account (for frontend)

## Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster (free tier is fine)
3. Create a database user with read/write permissions
4. Get your connection string (it should look like: `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`)
5. Whitelist all IP addresses (0.0.0.0/0) for production or specific IPs

## Step 2: Deploy Backend to Render

1. **Connect Repository**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select your repository

2. **Configure Service**
   - **Name**: `nviaxis-backend`
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

3. **Set Environment Variables**
   Add these environment variables in Render:
   ```
   NODE_ENV=production
   MONGODB_URI=your_mongodb_connection_string_here
   JWT_SECRET=your_super_secret_jwt_key_make_it_long_and_random_at_least_32_chars
   ADMIN_PASSWORD=your_secure_admin_password_here
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note your backend URL (e.g., `https://nviaxis-backend.onrender.com`)

## Step 3: Update CORS Configuration

After getting your Netlify domain (next step), update the CORS configuration in `backend/server.js`:

```javascript
const corsOptions = {
  origin: NODE_ENV === 'production' 
    ? ['https://your-netlify-domain.netlify.app', 'https://your-custom-domain.com']
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200
};
```

Replace `your-netlify-domain.netlify.app` with your actual Netlify domain.

## Step 4: Deploy Frontend to Netlify

1. **Connect Repository**
   - Go to [Netlify Dashboard](https://app.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select your repository

2. **Configure Build Settings**
   - **Branch to deploy**: `main`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

3. **Set Environment Variables**
   Go to Site settings → Environment variables and add:
   ```
   VITE_API_BASE_URL=https://your-render-backend-url.onrender.com/api
   VITE_ADMIN_PASSWORD=your_secure_admin_password_here
   VITE_APP_NAME=NviAxis
   VITE_APP_VERSION=1.0.0
   ```

4. **Update netlify.toml**
   Update the `netlify.toml` file with your actual Render backend URL:
   ```toml
   [[redirects]]
     from = "/api/*"
     to = "https://your-actual-render-url.onrender.com/api/:splat"
     status = 200
     force = true
   ```

5. **Deploy**
   - Click "Deploy site"
   - Wait for deployment to complete
   - Note your frontend URL

## Step 5: Update Backend CORS (Final Step)

1. Update your `backend/server.js` with the actual Netlify URL
2. Commit and push changes
3. Render will automatically redeploy

## Step 6: Test Your Application

1. Visit your Netlify URL
2. Test the following:
   - Homepage loads correctly
   - Posts page displays
   - Admin login works
   - Creating/editing posts works
   - All API calls are successful

## Environment Variables Summary

### Backend (Render)
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your_super_secret_jwt_key_at_least_32_characters_long
ADMIN_PASSWORD=your_secure_admin_password
```

### Frontend (Netlify)
```
VITE_API_BASE_URL=https://your-render-backend-url.onrender.com/api
VITE_ADMIN_PASSWORD=your_secure_admin_password
VITE_APP_NAME=NviAxis
VITE_APP_VERSION=1.0.0
```

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure your Netlify domain is added to CORS origins in backend
   - Check that credentials are properly configured

2. **API Connection Issues**
   - Verify `VITE_API_BASE_URL` points to correct Render URL
   - Check that backend is running on Render

3. **Database Connection Issues**
   - Verify MongoDB connection string is correct
   - Check that IP whitelist includes 0.0.0.0/0

4. **Build Failures**
   - Check build logs in Render/Netlify dashboards
   - Ensure all dependencies are in package.json

### Monitoring

- **Backend Logs**: Check Render dashboard → Your service → Logs
- **Frontend Logs**: Check Netlify dashboard → Your site → Functions (if any) or deploy logs
- **Database**: Monitor through MongoDB Atlas dashboard

## Security Best Practices

1. **Environment Variables**: Never commit .env files to git
2. **JWT Secret**: Use a strong, random secret (at least 32 characters)
3. **Admin Password**: Use a strong password
4. **CORS**: Only allow your actual domains, not wildcards
5. **HTTPS**: Both services should use HTTPS (automatic with Render/Netlify)

## Custom Domain (Optional)

### For Netlify (Frontend)
1. Go to Site settings → Domain management
2. Add custom domain
3. Configure DNS records as instructed

### For Render (Backend)
1. Go to your service → Settings
2. Add custom domain
3. Configure DNS records as instructed

## Maintenance

- **Updates**: Push to main branch for automatic deployments
- **Monitoring**: Set up uptime monitoring for both services
- **Backups**: MongoDB Atlas provides automatic backups
- **Logs**: Regularly check logs for errors

Your application is now deployed and ready for production use!
