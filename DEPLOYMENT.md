# Deployment Guide

## Quick Deploy Options

### Option 1: Vercel (Frontend) + MongoDB Atlas (Database) - Recommended

This is the easiest setup for a full-stack deployment.

#### Step 1: Deploy Backend

**Using Vercel Serverless Functions:**

1. Create `api/` folder in your project root
2. Move backend code to serverless functions
3. OR use a separate backend deployment (see below)

**Using Railway (for Backend):**

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your `pollify` repository
5. Railway will detect Node.js
6. Add environment variables:
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   PORT=3001
   CLIENT_URL=https://your-pollify-app.vercel.app
   ```
7. Deploy!
8. Copy your Railway app URL (e.g., `https://pollify-backend.up.railway.app`)

#### Step 2: Deploy Frontend

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure:
   - Framework Preset: Vite
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add environment variable:
   ```
   VITE_API_URL=https://pollify-backend.up.railway.app/api
   ```
5. Deploy!

### Option 2: Render (Full Stack)

Deploy both frontend and backend on Render.

#### Backend Deployment

1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your repository
5. Configure:
   - Name: `pollify-api`
   - Environment: Node
   - Build Command: `cd server && npm install`
   - Start Command: `cd server && npm start`
6. Add environment variables:
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   PORT=10000
   CLIENT_URL=https://pollify.onrender.com
   ```
7. Create Web Service

#### Frontend Deployment

1. Click "New +" → "Static Site"
2. Connect same repository
3. Configure:
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
4. Add environment variable:
   ```
   VITE_API_URL=https://pollify-api.onrender.com/api
   ```
5. Deploy!

### Option 3: Netlify (Frontend) + Heroku (Backend)

#### Backend on Heroku

1. Install Heroku CLI
2. Login and create app:
```bash
heroku login
heroku create pollify-api
```

3. Add MongoDB Atlas:
```bash
heroku config:set MONGODB_URI="your_connection_string"
heroku config:set CLIENT_URL="https://pollify.netlify.app"
```

4. Create `Procfile` in server directory:
```
web: node index.js
```

5. Deploy:
```bash
cd server
git init
git add .
git commit -m "Deploy backend"
heroku git:remote -a pollify-api
git push heroku main
```

#### Frontend on Netlify

1. Go to [netlify.com](https://netlify.com)
2. Import from GitHub
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Environment variables:
   ```
   VITE_API_URL=https://pollify-api.herokuapp.com/api
   ```
5. Deploy!

## MongoDB Atlas Setup (Required for All Options)

1. Go to [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster (M0)
3. Create database user
4. Whitelist all IPs: `0.0.0.0/0`
5. Get connection string
6. Replace `<password>` and database name

## Environment Variables Reference

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/pollify
PORT=3001
CLIENT_URL=https://your-frontend-url.com
```

### Frontend (.env.production)
```env
VITE_API_URL=https://your-backend-url.com/api
```

## Custom Domain Setup

### Vercel
1. Go to project settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### Netlify
1. Go to Domain settings
2. Add custom domain
3. Update nameservers or DNS records

## Post-Deployment Checklist

- [ ] MongoDB Atlas is configured and accessible
- [ ] Backend health check works: `https://your-api/api/health`
- [ ] Frontend can reach backend API
- [ ] CORS is configured correctly
- [ ] Environment variables are set
- [ ] Create a test poll
- [ ] Vote on test poll
- [ ] View results
- [ ] Test on mobile device

## Monitoring

### Vercel
- Built-in analytics available
- View deployment logs in dashboard

### Railway
- Real-time logs in dashboard
- Metrics and usage tracking

### Render
- Logs available in dashboard
- Set up health checks

## Cost Estimates

All options have generous free tiers:

- **MongoDB Atlas**: Free (M0 cluster - 512MB)
- **Vercel**: Free (hobby tier)
- **Railway**: $5/month after free credits
- **Render**: Free tier available
- **Netlify**: Free tier available
- **Heroku**: ~$7/month (discontinued free tier)

## Troubleshooting

### CORS Errors
- Update `CLIENT_URL` in backend environment variables
- Ensure frontend URL matches exactly (no trailing slash)

### Database Connection Failed
- Check MongoDB Atlas IP whitelist
- Verify connection string
- Test connection string locally first

### Build Failures
- Check Node.js version compatibility
- Verify all dependencies are in package.json
- Check build logs for specific errors

### API Not Reachable
- Verify backend is running
- Check API URL in frontend env variables
- Test API endpoints directly with curl/Postman

## Scaling Considerations

For high traffic:
1. Upgrade MongoDB Atlas cluster
2. Enable connection pooling
3. Add Redis for caching
4. Implement rate limiting
5. Use CDN for static assets
6. Consider serverless functions for API

## Support

Need help? Check:
- Backend logs for API errors
- Browser console for frontend errors
- Network tab for API call failures
- MongoDB Atlas logs for database issues

