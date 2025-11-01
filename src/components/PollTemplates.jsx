import './PollTemplates.css';

const TEMPLATES = [
  {
    id: 'food',
    icon: '🍕',
    name: 'Food Decision',
    question: 'What should we order for lunch?',
    options: ['Pizza', 'Burgers', 'Sushi', 'Tacos'],
    multipleChoice: false
  },
  {
    id: 'meeting',
    icon: '📅',
    name: 'Meeting Time',
    question: 'Which time works best for you?',
    options: ['9:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'],
    multipleChoice: true
  },
  {
    id: 'feedback',
    icon: '⭐',
    name: 'Quick Feedback',
    question: 'How would you rate this?',
    options: ['Excellent', 'Good', 'Fair', 'Poor'],
    multipleChoice: false
  },
  {
    id: 'yesno',
    icon: '✅',
    name: 'Yes or No',
    question: 'Should we proceed with this?',
    options: ['Yes', 'No'],
    multipleChoice: false
  },
  {
    id: 'movie',
    icon: '🎬',
    name: 'Movie Night',
    question: 'Which movie should we watch?',
    options: ['Action', 'Comedy', 'Drama', 'Sci-Fi'],
    multipleChoice: false
  },
  {
    id: 'event',
    icon: '🎉',
    name: 'Event RSVP',
    question: 'Can you attend the event?',
    options: ['Yes, I\'ll be there!', 'Maybe', 'No, sorry'],
    multipleChoice: false
  },
  {
    id: 'preference',
    icon: '💡',
    name: 'Team Preference',
    question: 'Which feature should we prioritize?',
    options: ['Feature A', 'Feature B', 'Feature C', 'Feature D'],
    multipleChoice: true
  },
  {
    id: 'weekend',
    icon: '🌴',
    name: 'Weekend Plans',
    question: 'What should we do this weekend?',
    options: ['Go hiking', 'Watch movies', 'Play games', 'Relax at home'],
    multipleChoice: true
  }
];

function PollTemplates({ onSelectTemplate, onClose }) {
  return (
    <div className="poll-templates-overlay" onClick={onClose}>
      <div className="poll-templates-modal" onClick={(e) => e.stopPropagation()}>
        <div className="templates-header">
          <h2>📋 Choose a Template</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="templates-grid">
          {TEMPLATES.map((template) => (
            <button
              key={template.id}
              className="template-card"
              onClick={() => {
                onSelectTemplate(template);
                onClose();
              }}
            >
              <div className="template-icon">{template.icon}</div>
              <div className="template-name">{template.name}</div>
              <div className="template-preview">
                <div className="preview-question">{template.question}</div>
                <div className="preview-options">
                  {template.options.slice(0, 2).map((opt, i) => (
                    <div key={i} className="preview-option">{opt}</div>
                  ))}
                  {template.options.length > 2 && (
                    <div className="preview-more">+{template.options.length - 2} more</div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="templates-footer">
          <button className="start-blank-btn" onClick={onClose}>
            Start from scratch instead
          </button>
        </div>
      </div>
    </div>
  );
}

export default PollTemplates;

