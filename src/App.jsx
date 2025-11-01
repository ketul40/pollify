import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import CreatePoll from './components/CreatePoll';
import ViewPoll from './components/ViewPoll';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <ThemeToggle />
          <Routes>
            <Route path="/" element={<CreatePoll />} />
            <Route path="/poll/:pollId" element={<ViewPoll />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
