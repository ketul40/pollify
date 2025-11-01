// Generate a unique poll ID
export const generatePollId = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < 8; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
};

// Store poll in localStorage
export const savePoll = (pollId, pollData) => {
  try {
    const polls = getAllPolls();
    polls[pollId] = {
      ...pollData,
      createdAt: Date.now(),
      votes: pollData.votes || {}
    };
    localStorage.setItem('pollify_polls', JSON.stringify(polls));
    return true;
  } catch (error) {
    console.error('Error saving poll:', error);
    return false;
  }
};

// Get all polls from localStorage
export const getAllPolls = () => {
  try {
    const polls = localStorage.getItem('pollify_polls');
    return polls ? JSON.parse(polls) : {};
  } catch (error) {
    console.error('Error getting polls:', error);
    return {};
  }
};

// Get specific poll by ID
export const getPoll = (pollId) => {
  const polls = getAllPolls();
  return polls[pollId] || null;
};

// Check if user has voted on a poll
export const hasVoted = (pollId) => {
  try {
    const votedPolls = localStorage.getItem('pollify_voted');
    const voted = votedPolls ? JSON.parse(votedPolls) : [];
    return voted.includes(pollId);
  } catch (error) {
    return false;
  }
};

// Mark poll as voted
export const markAsVoted = (pollId) => {
  try {
    const votedPolls = localStorage.getItem('pollify_voted');
    const voted = votedPolls ? JSON.parse(votedPolls) : [];
    if (!voted.includes(pollId)) {
      voted.push(pollId);
      localStorage.setItem('pollify_voted', JSON.stringify(voted));
    }
  } catch (error) {
    console.error('Error marking as voted:', error);
  }
};

// Submit vote(s) to a poll
export const submitVote = (pollId, optionIndices) => {
  try {
    const poll = getPoll(pollId);
    if (!poll) return false;

    // Initialize votes if not present
    if (!poll.votes) {
      poll.votes = {};
      poll.options.forEach((_, index) => {
        poll.votes[index] = 0;
      });
    }

    // Add votes
    const indices = Array.isArray(optionIndices) ? optionIndices : [optionIndices];
    indices.forEach(index => {
      poll.votes[index] = (poll.votes[index] || 0) + 1;
    });

    // Save updated poll
    savePoll(pollId, poll);
    markAsVoted(pollId);
    return true;
  } catch (error) {
    console.error('Error submitting vote:', error);
    return false;
  }
};

// Get vote results
export const getResults = (pollId) => {
  const poll = getPoll(pollId);
  if (!poll) return null;

  const totalVotes = Object.values(poll.votes || {}).reduce((sum, count) => sum + count, 0);
  
  return {
    question: poll.question,
    options: poll.options,
    votes: poll.votes || {},
    totalVotes,
    multipleChoice: poll.multipleChoice,
    createdAt: poll.createdAt
  };
};

