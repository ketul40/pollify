import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getResults } from '../utils/api';
import ShareButtons from './ShareButtons';
import PollStatistics from './PollStatistics';
import './PollResults.css';

function PollResults({ pollId, onBackToVote }) {
  const navigate = useNavigate();
  const [results, setResults] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadResults();
    // Refresh results every 3 seconds for "real-time" updates
    const interval = setInterval(loadResults, 3000);
    return () => clearInterval(interval);
  }, [pollId]);

  const loadResults = async () => {
    try {
      const data = await getResults(pollId);
      if (data) {
        setResults(data);
      }
    } catch (error) {
      console.error('Error loading results:', error);
    }
  };

  const copyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!results) {
    return (
      <div className="poll-results loading">
        <div className="loading-spinner">Loading results...</div>
      </div>
    );
  }

  const maxVotes = Math.max(...Object.values(results.votes), 1);

  return (
    <div className="poll-results">
      <div className="results-header">
        <button onClick={() => navigate('/')} className="home-btn">
          ← Home
        </button>
        <div className="logo-mini">
          <span className="logo-icon">📊</span>
          <span>Pollify</span>
        </div>
      </div>

      <div className="results-card">
        <div className="results-title-section">
          <h2 className="results-question">{results.question}</h2>
          <div className="total-votes">
            <span className="vote-count">{results.totalVotes}</span>
            <span className="vote-label">total vote{results.totalVotes !== 1 ? 's' : ''}</span>
          </div>
        </div>

        <div className="results-list">
          {results.options.map((option, index) => {
            const votes = results.votes[index] || 0;
            const percentage = results.totalVotes > 0 
              ? Math.round((votes / results.totalVotes) * 100) 
              : 0;
            const barWidth = results.totalVotes > 0
              ? (votes / maxVotes) * 100
              : 0;

            return (
              <div key={index} className="result-item">
                <div className="result-header">
                  <span className="result-option">{option}</span>
                  <div className="result-stats">
                    <span className="result-votes">{votes} vote{votes !== 1 ? 's' : ''}</span>
                    <span className="result-percentage">{percentage}%</span>
                  </div>
                </div>
                <div className="result-bar-container">
                  <div 
                    className="result-bar"
                    style={{ width: `${barWidth}%` }}
                  >
                    <div className="bar-shine"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="results-actions">
          {onBackToVote && (
            <button onClick={onBackToVote} className="secondary-btn">
              Back to Poll
            </button>
          )}
          <button onClick={() => navigate('/')} className="create-new-btn">
            Create New Poll
          </button>
        </div>

        <PollStatistics results={results} />

        <ShareButtons pollId={pollId} question={results.question} />

        <div className="live-indicator">
          <span className="live-dot"></span>
          <span>Results update every 3 seconds</span>
        </div>
      </div>
    </div>
  );
}

export default PollResults;

