# Backend Setup Guide

## Prerequisites

- Node.js 16+ installed
- MongoDB installed locally OR MongoDB Atlas account (free tier)

## Option 1: Local MongoDB Setup

### Install MongoDB

**Windows:**
1. Download MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Install and run MongoDB as a service
3. MongoDB will run on `mongodb://localhost:27017`

**Mac (using Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu):**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

### Setup Steps

1. **Install backend dependencies:**
```bash
cd server
npm install
```

2. **Create `.env` file in the root directory:**
```env
MONGODB_URI=mongodb://localhost:27017/pollify
PORT=3001
CLIENT_URL=http://localhost:5173
```

3. **Start the backend server:**
```bash
npm run dev
```

The API will be running at `http://localhost:3001`

## Option 2: MongoDB Atlas (Cloud - Recommended for Production)

### Setup MongoDB Atlas

1. **Create account:**
   - Go to [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free

2. **Create a cluster:**
   - Choose the FREE tier (M0)
   - Select your preferred region
   - Create cluster

3. **Set up database access:**
   - Go to "Database Access"
   - Add a new database user
   - Choose password authentication
   - Save username and password

4. **Configure network access:**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Choose "Allow Access from Anywhere" (0.0.0.0/0) for development
   - Click "Confirm"

5. **Get connection string:**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `myFirstDatabase` with `pollify`

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/pollify?retryWrites=true&w=majority
```

6. **Update `.env` file:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/pollify?retryWrites=true&w=majority
PORT=3001
CLIENT_URL=http://localhost:5173
```

7. **Install and start:**
```bash
cd server
npm install
npm run dev
```

## Frontend Configuration

1. **Create `.env.local` file in the root directory (frontend):**
```env
VITE_API_URL=http://localhost:3001/api
```

2. **Start the frontend:**
```bash
# In the root directory
npm run dev
```

## Running Both Frontend and Backend

**Terminal 1 (Backend):**
```bash
cd server
npm run dev
```

**Terminal 2 (Frontend):**
```bash
npm run dev
```

Or use the npm script:
```bash
# Terminal 1
npm run server

# Terminal 2  
npm run dev
```

## Testing the API

### Health Check
```bash
curl http://localhost:3001/api/health
```

### Create a Poll
```bash
curl -X POST http://localhost:3001/api/polls \
  -H "Content-Type: application/json" \
  -d '{
    "question": "What is your favorite color?",
    "options": ["Red", "Blue", "Green"],
    "multipleChoice": false
  }'
```

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running: `mongod --version`
- Check the connection string in `.env`
- For Atlas: verify IP whitelist and credentials

### Port Already in Use
```bash
# Kill process on port 3001
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3001 | xargs kill -9
```

### CORS Errors
- Verify `CLIENT_URL` in `.env` matches your frontend URL
- Check that cors is enabled in `server/index.js`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/polls` | Create a new poll |
| GET | `/api/polls/:pollId` | Get poll by ID |
| POST | `/api/polls/:pollId/vote` | Submit a vote |
| GET | `/api/polls/:pollId/results` | Get poll results |
| POST | `/api/polls/:pollId/check-vote` | Check if voted |

## Database Schema

### Polls Collection
```javascript
{
  _id: ObjectId,
  pollId: String,         // Unique poll identifier
  question: String,       // Poll question
  options: [String],      // Array of options
  multipleChoice: Boolean,// Allow multiple selections
  votes: Object,          // { "0": 5, "1": 3, "2": 7 }
  voterIds: [String],     // Array of voter IDs
  createdAt: Date        // Creation timestamp
}
```

## Production Deployment

See `DEPLOYMENT.md` for instructions on deploying to production.

