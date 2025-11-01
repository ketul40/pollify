# Pollify 📊

**Simple, Instant Polls for Everyone**

Pollify is a frictionless polling application that lets you create polls in seconds, share them instantly, and see real-time results without any login or complicated setup. Built with React and Firebase.

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
- Firebase account (free)

### Quick Start

1. **Create Firebase Project** (see [FIREBASE_SETUP.md](./FIREBASE_SETUP.md))
   - Go to [console.firebase.google.com](https://console.firebase.google.com)
   - Create a new project
   - Set up Firestore Database
   - Copy your Firebase config

2. **Install dependencies:**
```bash
npm install
```

3. **Configure Firebase:**

Create `.env.local` in project root:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. **Start the application:**
```bash
npm run dev
```

5. **Open your browser:**
Navigate to `http://localhost:5173`

### Detailed Setup

- **Firebase Setup**: See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for complete Firebase configuration
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
- **Firebase Firestore** - NoSQL cloud database
- **Firebase Hosting** - Fast and secure hosting

### Features
- **Real-time Updates** - Results refresh every 3 seconds
- **Anonymous Voting** - No login required, tracked by unique browser ID
- **Serverless Architecture** - No backend server needed!
- **Persistent Storage** - Polls stored in Firebase Firestore
- **Instant Deployment** - Deploy with one command

## 📂 Project Structure

```
pollify/
├── src/
│   ├── components/
│   │   ├── CreatePoll.jsx       # Poll creation form
│   │   ├── CreatePoll.css
│   │   ├── ViewPoll.jsx         # Voting interface
│   │   ├── ViewPoll.css
│   │   ├── PollResults.jsx      # Results display
│   │   └── PollResults.css
│   ├── firebase/
│   │   └── config.js            # Firebase configuration
│   ├── utils/
│   │   ├── api.js               # Firestore API functions
│   │   └── pollUtils.js         # (legacy - for reference)
│   ├── App.jsx                  # Main app with routing
│   ├── App.css                  # Global app styles
│   ├── main.jsx                 # React entry point
│   └── index.css                # Global CSS reset
├── public/
│   └── vite.svg
├── index.html
├── vite.config.js
├── package.json
├── FIREBASE_SETUP.md            # Firebase setup guide
├── DEPLOYMENT.md                # Deployment guide
└── README.md                    # This file
```

## 🎨 Features in Detail

### Anonymous & Private
- No login required
- No personal data collected
- Anonymous voter IDs generated per browser
- Polls stored securely in Firebase Firestore
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
- ✅ ~~Persistent storage~~ (Completed with Firebase!)
- ✅ ~~Real-time updates~~ (Results refresh every 3s!)
- ✅ ~~Serverless architecture~~ (Firebase Firestore!)
- WebSocket updates for instant real-time (Firebase Realtime Database)
- Poll expiration dates (with Cloud Functions)
- Custom poll URLs
- Poll analytics dashboard
- Export results to CSV/PDF
- Social media preview cards
- Poll templates
- User accounts (Firebase Auth)
- Poll categories and tags
- Image/GIF support in polls

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
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)

---

**Built with ❤️ using React + Vite**

*Create your first poll in 10 seconds!*
