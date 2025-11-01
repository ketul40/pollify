// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Generate a unique voter ID for this browser
const getVoterId = () => {
  let voterId = localStorage.getItem('pollify_voter_id');
  if (!voterId) {
    voterId = `voter_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('pollify_voter_id', voterId);
  }
  return voterId;
};

// Create a new poll
export const createPoll = async (pollData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/polls`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pollData),
    });

    if (!response.ok) {
      throw new Error('Failed to create poll');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating poll:', error);
    throw error;
  }
};

// Get poll by ID
export const getPoll = async (pollId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/polls/${pollId}`);

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch poll');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching poll:', error);
    throw error;
  }
};

// Submit vote
export const submitVote = async (pollId, optionIndices) => {
  try {
    const voterId = getVoterId();
    const response = await fetch(`${API_BASE_URL}/polls/${pollId}/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        optionIndices,
        voterId,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to submit vote');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error submitting vote:', error);
    throw error;
  }
};

// Get poll results
export const getResults = async (pollId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/polls/${pollId}/results`);

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch results');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching results:', error);
    throw error;
  }
};

// Check if user has voted
export const checkVoted = async (pollId) => {
  try {
    const voterId = getVoterId();
    const response = await fetch(`${API_BASE_URL}/polls/${pollId}/check-vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ voterId }),
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.hasVoted;
  } catch (error) {
    console.error('Error checking vote status:', error);
    return false;
  }
};

