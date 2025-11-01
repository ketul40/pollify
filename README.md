# Pollify 📊

**Simple, Instant Polls for Everyone**

Pollify is a frictionless full-stack polling application that lets you create polls in seconds, share them instantly, and see real-time results without any login or complicated setup. Built with React, Node.js, Express, and MongoDB.

## 🎯 Core Features

### ⚡ 10-Second Poll Creation
- Create a poll with one question and up to 5 options
- Choose between single or multiple choice
- No account needed - completely anonymous

### 🔗 One-Click Sharing
- Get a unique short link instantly (e.g., `/poll/abc123`)
- Share via any platform - email, social media, messaging apps
- Clean, memorable URLs

### 📊 Real-Time Results
- Live vote count updates every 3 seconds
- Beautiful bar chart visualization with percentages
- Responsive design for all devices

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn
- MongoDB (local) OR MongoDB Atlas account (free)

### Quick Start

1. **Install dependencies:**
```bash
# Frontend dependencies
npm install

# Backend dependencies
cd server
npm install
cd ..
```

2. **Set up environment variables:**

Create `.env.local` in root (frontend):
```env
VITE_API_URL=http://localhost:3001/api
```

Create `.env` in root (backend):
```env
MONGODB_URI=mongodb://localhost:27017/pollify
PORT=3001
CLIENT_URL=http://localhost:5173
```

3. **Start MongoDB:**
```bash
# Make sure MongoDB is running locally
# Or use MongoDB Atlas (see BACKEND_SETUP.md)
```

4. **Start the application:**

Terminal 1 (Backend):
```bash
cd server
npm run dev
```

Terminal 2 (Frontend):
```bash
npm run dev
```

5. **Open your browser:**
Navigate to `http://localhost:5173`

### Detailed Setup

- **Backend Setup**: See [BACKEND_SETUP.md](./BACKEND_SETUP.md) for MongoDB installation and configuration
- **Deployment**: See [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment instructions

### Build for Production

```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 📱 How It Works

### Creating a Poll
1. Visit the homepage
2. Enter your question (up to 200 characters)
3. Add 2-5 answer options
4. Optionally enable multiple choice voting
5. Click "Create Poll" to get your unique link

### Voting
1. Visit a poll link
2. Select your answer(s)
3. Click "Submit Vote"
4. View the results instantly
5. Votes are tracked via browser localStorage (one vote per device)

### Viewing Results
- Results are visible to everyone with the poll link
- Bar charts show vote distribution
- Total vote count displayed prominently
- Results refresh automatically every 3 seconds

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **React Router 6** - Client-side routing
- **Vite 5** - Lightning-fast build tool
- **CSS3** - Modern styling with gradients, animations, and glass-morphism

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **MongoDB** - NoSQL database for poll storage
- **CORS** - Cross-origin resource sharing

### Features
- **Real-time Updates** - Results refresh every 3 seconds
- **Anonymous Voting** - No login required, tracked by unique browser ID
- **RESTful API** - Clean API architecture
- **Persistent Storage** - Polls stored in MongoDB database

## 📂 Project Structure

```
pollify/
├── src/                          # Frontend source code
│   ├── components/
│   │   ├── CreatePoll.jsx       # Poll creation form
│   │   ├── CreatePoll.css
│   │   ├── ViewPoll.jsx         # Voting interface
│   │   ├── ViewPoll.css
│   │   ├── PollResults.jsx      # Results display
│   │   └── PollResults.css
│   ├── utils/
│   │   ├── api.js               # API client functions
│   │   └── pollUtils.js         # (deprecated - now using API)
│   ├── App.jsx                  # Main app with routing
│   ├── App.css                  # Global app styles
│   ├── main.jsx                 # React entry point
│   └── index.css                # Global CSS reset
├── server/                       # Backend source code
│   ├── index.js                 # Express server & API routes
│   └── package.json             # Backend dependencies
├── public/
│   └── vite.svg
├── index.html
├── vite.config.js
├── package.json                 # Frontend dependencies
├── BACKEND_SETUP.md             # Backend setup instructions
└── DEPLOYMENT.md                # Deployment guide
```

## 🎨 Features in Detail

### Anonymous & Private
- No login required
- No personal data collected
- Anonymous voter IDs generated per browser
- Polls stored in MongoDB database
- One vote per device enforced

### Beautiful UI
- Modern gradient design
- Smooth animations and transitions
- Glass-morphism effects
- Responsive mobile-first design
- Dark/Light mode support (automatic)

### Developer-Friendly
- Clean, modular code structure
- Utility functions for poll management
- Easy to extend and customize
- Well-commented code

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔮 Future Enhancements

Potential features for future development:
- ✅ ~~Backend API for persistent storage~~ (Completed!)
- ✅ ~~Real-time updates~~ (Polling every 3s - Completed!)
- WebSocket updates for instant real-time
- Poll expiration dates
- Custom poll URLs
- Poll analytics and insights
- Export results to CSV/PDF
- Social media preview cards
- Poll templates
- User accounts (optional)
- Poll categories and tags

## 📄 License

MIT License - feel free to use this project for learning or building your own polling application!

## 🤝 Contributing

This is a learning project, but contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 💡 Learn More

- [React Documentation](https://react.dev)
- [React Router Documentation](https://reactrouter.com)
- [Vite Documentation](https://vitejs.dev)

---

**Built with ❤️ using React + Vite**

*Create your first poll in 10 seconds!*
