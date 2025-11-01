# 🚀 Pollify Quick Start Guide

Your full-stack polling app is ready! Here's everything you need to get started.

## ✅ What's Been Set Up

- ✅ Git repository initialized and pushed to GitHub
- ✅ Full-stack architecture (React + Node.js + Express + MongoDB)
- ✅ RESTful API with 6 endpoints
- ✅ Anonymous voting system
- ✅ Real-time result updates
- ✅ Responsive UI with modern design
- ✅ Comprehensive documentation

## 📋 Next Steps

### 1. Set Up MongoDB (Choose One Option)

#### Option A: Local MongoDB (Easiest for Testing)
```bash
# Install MongoDB Community Server
# Download from: https://www.mongodb.com/try/download/community

# Verify it's running
mongod --version
```

#### Option B: MongoDB Atlas (Recommended for Production)
1. Go to [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free (M0 cluster)
3. Create a database user
4. Whitelist all IPs: `0.0.0.0/0`
5. Get connection string

### 2. Create Environment Files

**Create `.env` in project root:**
```env
MONGODB_URI=mongodb://localhost:27017/pollify
# OR for Atlas:
# MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/pollify

PORT=3001
CLIENT_URL=http://localhost:5173
```

**Create `.env.local` in project root:**
```env
VITE_API_URL=http://localhost:3001/api
```

### 3. Install Backend Dependencies

```bash
cd server
npm install
cd ..
```

### 4. Run the Application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

You should see:
```
✅ Connected to MongoDB
🚀 Pollify API server running on http://localhost:3001
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

Visit: **http://localhost:5173**

## 🧪 Test Your App

1. **Create a poll** - Add question and options
2. **Copy the poll link** - You'll get a unique URL
3. **Open in incognito** - Vote as a different user
4. **See real-time results** - Updates every 3 seconds!

## 📚 Documentation

- **[BACKEND_SETUP.md](./BACKEND_SETUP.md)** - Detailed MongoDB setup
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deploy to production
- **[README.md](./README.md)** - Full project documentation

## 🌐 Deploy to Production

When you're ready to deploy:

### Easiest: Vercel (Frontend) + Railway (Backend)

1. **Deploy Backend to Railway:**
   ```bash
   # Go to railway.app
   # Import your GitHub repo
   # Add MONGODB_URI environment variable
   # Deploy!
   ```

2. **Deploy Frontend to Vercel:**
   ```bash
   # Go to vercel.com
   # Import your GitHub repo
   # Add VITE_API_URL=https://your-backend-url/api
   # Deploy!
   ```

Full deployment instructions in [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🔍 API Endpoints

Your backend API is at `http://localhost:3001/api`

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/polls` | POST | Create poll |
| `/polls/:id` | GET | Get poll |
| `/polls/:id/vote` | POST | Submit vote |
| `/polls/:id/results` | GET | Get results |
| `/polls/:id/check-vote` | POST | Check if voted |

## 💡 Key Features

✨ **No Login Required** - Completely anonymous
🔐 **One Vote Per Device** - Tracked by unique browser ID
📊 **Real-Time Updates** - Results refresh automatically
💾 **Persistent Storage** - All polls saved in MongoDB
🎨 **Beautiful UI** - Modern gradients and animations
📱 **Mobile Responsive** - Works on all devices
🌓 **Dark/Light Mode** - Automatic theme switching

## ⚡ Pro Tips

1. **Test with multiple browsers** - See voting restrictions work
2. **Check MongoDB** - Use MongoDB Compass to view data
3. **API Testing** - Use Postman or curl to test endpoints
4. **Monitor logs** - Check both terminals for errors
5. **Browser DevTools** - Network tab shows API calls

## 🆘 Troubleshooting

### MongoDB Connection Failed
```bash
# Check MongoDB is running
mongod --version

# For Atlas, verify:
# - IP whitelist includes 0.0.0.0/0
# - Connection string is correct
# - Database user has permissions
```

### Backend Port Conflict
```bash
# Kill process on port 3001
# Windows:
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3001 | xargs kill -9
```

### CORS Errors
- Verify `CLIENT_URL` in backend `.env` matches frontend URL
- Check browser console for specific error

### API Not Reachable
- Verify backend is running on port 3001
- Check `VITE_API_URL` in frontend `.env.local`
- Test API: `curl http://localhost:3001/api/health`

## 🎉 You're All Set!

Your Pollify app is ready to create instant polls! 

**Need help?** Check the detailed guides:
- Setup issues → [BACKEND_SETUP.md](./BACKEND_SETUP.md)
- Deployment → [DEPLOYMENT.md](./DEPLOYMENT.md)
- Features → [README.md](./README.md)

**Happy polling! 📊**

