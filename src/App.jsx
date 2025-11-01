import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreatePoll from './components/CreatePoll';
import ViewPoll from './components/ViewPoll';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<CreatePoll />} />
          <Route path="/poll/:pollId" element={<ViewPoll />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
