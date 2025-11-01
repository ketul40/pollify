# Pollify 📊

**Simple, Instant Polls for Everyone**

Pollify is a frictionless polling application that lets you create polls in seconds, share them instantly, and see real-time results without any login or complicated setup.

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

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

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

- **React 18** - Modern UI library with hooks
- **React Router 6** - Client-side routing
- **Vite 5** - Lightning-fast build tool
- **LocalStorage** - Anonymous vote tracking and poll storage
- **CSS3** - Modern styling with gradients, animations, and glass-morphism

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
│   ├── utils/
│   │   └── pollUtils.js         # Poll management utilities
│   ├── App.jsx                  # Main app with routing
│   ├── App.css                  # Global app styles
│   ├── main.jsx                 # React entry point
│   └── index.css                # Global CSS reset
├── public/
│   └── vite.svg
├── index.html
├── vite.config.js
└── package.json
```

## 🎨 Features in Detail

### Anonymous & Private
- No login required
- No personal data collected
- Votes stored locally in browser
- Polls stored in localStorage

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
- Backend API for persistent storage
- Real-time WebSocket updates
- Poll expiration dates
- Custom poll URLs
- Poll analytics and insights
- Export results to CSV/PDF
- Social media preview cards
- Poll templates

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
