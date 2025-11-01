import './PollStatistics.css';

function PollStatistics({ results }) {
  if (!results || !results.options) return null;

  const { options, votes, totalVotes, createdAt } = results;

  // Calculate statistics
  const sortedOptions = options
    .map((option, index) => ({
      option,
      votes: votes[index] || 0,
      percentage: totalVotes > 0 ? ((votes[index] || 0) / totalVotes * 100).toFixed(1) : 0
    }))
    .sort((a, b) => b.votes - a.votes);

  const winner = sortedOptions[0];
  const averageVotes = totalVotes > 0 ? (totalVotes / options.length).toFixed(1) : 0;
  
  // Time since creation
  const timeSince = createdAt?.toDate ? 
    getTimeSince(createdAt.toDate()) : 
    'Recently';

  return (
    <div className="poll-statistics">
      <h3 className="stats-title">📊 Poll Statistics</h3>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🗳️</div>
          <div className="stat-value">{totalVotes}</div>
          <div className="stat-label">Total Votes</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-value">{options.length}</div>
          <div className="stat-label">Options</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-value">{averageVotes}</div>
          <div className="stat-label">Avg per Option</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🕐</div>
          <div className="stat-value">{timeSince}</div>
          <div className="stat-label">Poll Age</div>
        </div>
      </div>

      {totalVotes > 0 && (
        <>
          <div className="winner-section">
            <div className="winner-badge">🏆 Leading Option</div>
            <div className="winner-details">
              <div className="winner-name">{winner.option}</div>
              <div className="winner-stats">
                {winner.votes} votes ({winner.percentage}%)
              </div>
            </div>
          </div>

          <div className="leaderboard">
            <h4 className="leaderboard-title">Ranking</h4>
            <div className="leaderboard-list">
              {sortedOptions.map((item, index) => (
                <div key={index} className="leaderboard-item">
                  <div className="rank-badge">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                  </div>
                  <div className="rank-option">{item.option}</div>
                  <div className="rank-stats">
                    <span className="rank-votes">{item.votes}</span>
                    <span className="rank-percentage">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function getTimeSince(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60
  };

  for (const [name, value] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / value);
    if (interval >= 1) {
      return `${interval} ${name}${interval > 1 ? 's' : ''}`;
    }
  }
  
  return 'Just now';
}

export default PollStatistics;

