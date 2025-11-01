import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPoll } from '../utils/api';
import './CreatePoll.css';

function CreatePoll() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [multipleChoice, setMultipleChoice] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const addOption = () => {
    if (options.length < 5) {
      setOptions([...options, '']);
    }
  };

  const removeOption = (index) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const updateOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!question.trim()) {
      setError('Please enter a question');
      return;
    }

    const validOptions = options.filter(opt => opt.trim());
    if (validOptions.length < 2) {
      setError('Please provide at least 2 options');
      return;
    }

    // Create poll via API
    setLoading(true);
    try {
      const pollData = {
        question: question.trim(),
        options: validOptions,
        multipleChoice,
      };

      const response = await createPoll(pollData);
      navigate(`/poll/${response.pollId}`);
    } catch (error) {
      setError('Failed to create poll. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-poll">
      <div className="create-poll-header">
        <div className="logo-section">
          <div className="logo-icon">📊</div>
          <h1>Pollify</h1>
        </div>
        <p className="tagline">Simple, Instant Polls for Everyone</p>
      </div>

      <form onSubmit={handleSubmit} className="poll-form">
        <div className="form-section">
          <label htmlFor="question" className="form-label">
            Your Question
          </label>
          <input
            id="question"
            type="text"
            className="question-input"
            placeholder="What's your question?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            maxLength={200}
          />
        </div>

        <div className="form-section">
          <label className="form-label">Options</label>
          <div className="options-list">
            {options.map((option, index) => (
              <div key={index} className="option-input-group">
                <span className="option-number">{index + 1}</span>
                <input
                  type="text"
                  className="option-input"
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                  maxLength={100}
                />
                {options.length > 2 && (
                  <button
                    type="button"
                    className="remove-option-btn"
                    onClick={() => removeOption(index)}
                    aria-label="Remove option"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>

          {options.length < 5 && (
            <button
              type="button"
              className="add-option-btn"
              onClick={addOption}
            >
              + Add Option
            </button>
          )}
        </div>

        <div className="form-section">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={multipleChoice}
              onChange={(e) => setMultipleChoice(e.target.checked)}
            />
            <span>Allow multiple choices</span>
          </label>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="create-btn" disabled={loading}>
          <span>{loading ? 'Creating Poll...' : 'Create Poll'}</span>
          {!loading && (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 0L15 5H12V11H8V5H5L10 0Z" transform="rotate(90 10 10)"/>
            </svg>
          )}
        </button>
      </form>

      <div className="features-info">
        <div className="feature-item">
          <span className="feature-icon">⚡</span>
          <span>10-second creation</span>
        </div>
        <div className="feature-item">
          <span className="feature-icon">🔗</span>
          <span>One-click sharing</span>
        </div>
        <div className="feature-item">
          <span className="feature-icon">📊</span>
          <span>Real-time results</span>
        </div>
      </div>
    </div>
  );
}

export default CreatePoll;

