import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPoll, submitVote, checkVoted } from '../utils/api';
import { celebrateVote } from '../utils/celebrations';
import PollResults from './PollResults';
import './ViewPoll.css';

function ViewPoll() {
  const { pollId } = useParams();
  const navigate = useNavigate();
  const [poll, setPoll] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadPoll = async () => {
      try {
        const pollData = await getPoll(pollId);
        if (!pollData) {
          setError('Poll not found');
        } else {
          setPoll(pollData);
          // Check if user has already voted
          const voted = await checkVoted(pollId);
          if (voted) {
            setShowResults(true);
          }
        }
      } catch (err) {
        setError('Failed to load poll');
      } finally {
        setLoading(false);
      }
    };
    loadPoll();
  }, [pollId]);

  const handleOptionSelect = (index) => {
    if (poll.multipleChoice) {
      // Toggle selection for multiple choice
      setSelectedOptions(prev =>
        prev.includes(index)
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    } else {
      // Single selection
      setSelectedOptions([index]);
    }
  };

  const handleSubmit = async () => {
    if (selectedOptions.length === 0) {
      setError('Please select at least one option');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await submitVote(pollId, selectedOptions);
      celebrateVote(); // 🎉 Celebration!
      setTimeout(() => {
        setShowResults(true);
      }, 800);
      // Refresh poll data
      const updatedPoll = await getPoll(pollId);
      setPoll(updatedPoll);
    } catch (err) {
      setError(err.message || 'Failed to submit vote. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const copyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (error === 'Poll not found') {
    return (
      <div className="view-poll error-view">
        <div className="error-card">
          <div className="error-icon">❌</div>
          <h2>Poll Not Found</h2>
          <p>The poll you're looking for doesn't exist or has been deleted.</p>
          <button onClick={() => navigate('/')} className="back-home-btn">
            Create a New Poll
          </button>
        </div>
      </div>
    );
  }

  if (loading || !poll) {
    return (
      <div className="view-poll loading">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (showResults) {
    return <PollResults pollId={pollId} onBackToVote={() => setShowResults(false)} />;
  }

  return (
    <div className="view-poll">
      <div className="poll-header">
        <button onClick={() => navigate('/')} className="home-btn">
          ← Home
        </button>
        <div className="logo-mini">
          <span className="logo-icon">📊</span>
          <span>Pollify</span>
        </div>
      </div>

      <div className="poll-card">
        <div className="poll-question-section">
          <h2 className="poll-question">{poll.question}</h2>
          {poll.multipleChoice && (
            <span className="multiple-badge">Multiple choices allowed</span>
          )}
        </div>

        <div className="voting-options">
          {poll.options.map((option, index) => (
            <button
              key={index}
              className={`vote-option ${selectedOptions.includes(index) ? 'selected' : ''}`}
              onClick={() => handleOptionSelect(index)}
            >
              <div className="option-checkbox">
                {poll.multipleChoice ? (
                  <div className={`checkbox ${selectedOptions.includes(index) ? 'checked' : ''}`}>
                    {selectedOptions.includes(index) && '✓'}
                  </div>
                ) : (
                  <div className={`radio ${selectedOptions.includes(index) ? 'checked' : ''}`}>
                    {selectedOptions.includes(index) && <div className="radio-dot" />}
                  </div>
                )}
              </div>
              <span className="option-text">{option}</span>
            </button>
          ))}
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="poll-actions">
          <button
            onClick={handleSubmit}
            className="submit-vote-btn"
            disabled={selectedOptions.length === 0 || submitting}
          >
            {submitting ? 'Submitting...' : 'Submit Vote'}
          </button>
          <button onClick={() => setShowResults(true)} className="view-results-btn">
            View Results
          </button>
        </div>

        <div className="share-section">
          <input
            type="text"
            className="share-link"
            value={window.location.href}
            readOnly
            onClick={(e) => e.target.select()}
          />
          <button onClick={copyLink} className="copy-btn">
            {copied ? '✓ Copied!' : 'Copy Link'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewPoll;

