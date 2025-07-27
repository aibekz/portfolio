# Deployment Checklist ✅

Use this checklist to ensure your deployment goes smoothly.

## Pre-Deployment Checklist

### 🔧 Code Preparation
- [ ] All code committed and pushed to GitHub
- [ ] Build runs successfully locally (`npm run build`)
- [ ] No console errors in development
- [ ] All environment variables documented in `.env.example`

### 🗄️ Database Setup
- [ ] MongoDB Atlas cluster created
- [ ] Database user created with read/write permissions
- [ ] Network access configured (0.0.0.0/0 for production)
- [ ] Connection string obtained

### 🔐 Security
- [ ] Strong JWT secret generated (32+ characters)
- [ ] Secure admin password chosen
- [ ] Environment variables never committed to git
- [ ] CORS origins properly configured

## Backend Deployment (Render)

### 📋 Render Configuration
- [ ] Repository connected to Render
- [ ] Root directory set to `backend`
- [ ] Build command: `npm install`
- [ ] Start command: `npm start`
- [ ] Environment variables configured:
  - [ ] `NODE_ENV=production`
  - [ ] `MONGODB_URI=your_connection_string`
  - [ ] `JWT_SECRET=your_jwt_secret`
  - [ ] `ADMIN_PASSWORD=your_admin_password`

### ✅ Backend Testing
- [ ] Service deploys successfully
- [ ] Health check endpoint works (`/api/health`)
- [ ] Database connection established
- [ ] API endpoints respond correctly

## Frontend Deployment (Netlify)

### 📋 Netlify Configuration
- [ ] Repository connected to Netlify
- [ ] Build command: `npm run build`
- [ ] Publish directory: `dist`
- [ ] Environment variables configured:
  - [ ] `VITE_API_BASE_URL=https://your-backend.onrender.com/api`
  - [ ] `VITE_ADMIN_PASSWORD=your_admin_password`
  - [ ] `VITE_APP_NAME=NviAxis`
  - [ ] `VITE_APP_VERSION=1.0.0`

### 🔄 Configuration Updates
- [ ] `netlify.toml` updated with actual backend URL
- [ ] Backend CORS updated with actual Netlify domain
- [ ] Changes committed and pushed

### ✅ Frontend Testing
- [ ] Site deploys successfully
- [ ] All pages load correctly
- [ ] API calls work (check network tab)
- [ ] Admin login functions
- [ ] Post creation/editing works

## Post-Deployment Testing

### 🧪 Full Application Test
- [ ] Homepage loads
- [ ] Posts page displays content
- [ ] Individual post pages work
- [ ] Admin login successful
- [ ] Admin dashboard accessible
- [ ] Create new post works
- [ ] Edit existing post works
- [ ] Delete post works
- [ ] All forms submit correctly

### 🔍 Technical Verification
- [ ] No console errors
- [ ] All API calls return expected responses
- [ ] Images/assets load correctly
- [ ] Mobile responsiveness works
- [ ] SEO meta tags present

## Performance & Monitoring

### 📊 Performance
- [ ] Page load times acceptable
- [ ] API response times reasonable
- [ ] Images optimized
- [ ] Bundle size reasonable

### 📈 Monitoring Setup
- [ ] Render service monitoring enabled
- [ ] Netlify deploy notifications configured
- [ ] MongoDB Atlas monitoring reviewed
- [ ] Error tracking considered (optional)

## Documentation

### 📚 Documentation Updated
- [ ] README.md updated with live URLs
- [ ] API documentation current
- [ ] Environment variables documented
- [ ] Deployment process documented

## Final Steps

### 🚀 Go Live
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificates active
- [ ] DNS propagated
- [ ] All stakeholders notified

### 🔄 Maintenance Plan
- [ ] Backup strategy confirmed
- [ ] Update process established
- [ ] Monitoring alerts configured
- [ ] Support contact information ready

---

## Quick Commands Reference

```bash
# Test build locally
npm run build

# Check backend health
curl https://your-backend.onrender.com/api/health

# Test API endpoint
curl https://your-backend.onrender.com/api/posts
```

## Emergency Contacts

- **Render Support**: [Render Help](https://render.com/docs)
- **Netlify Support**: [Netlify Support](https://www.netlify.com/support/)
- **MongoDB Atlas**: [Atlas Support](https://www.mongodb.com/cloud/atlas/support)

---

**Deployment Date**: ___________  
**Deployed By**: ___________  
**Backend URL**: ___________  
**Frontend URL**: ___________  

✅ **Deployment Complete!**
