import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc,
  increment,
  arrayUnion,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase/config';

// Generate a unique voter ID for this browser
const getVoterId = () => {
  let voterId = localStorage.getItem('pollify_voter_id');
  if (!voterId) {
    voterId = `voter_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('pollify_voter_id', voterId);
  }
  return voterId;
};

// Generate a unique poll ID
const generatePollId = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < 8; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
};

// Create a new poll
export const createPoll = async (pollData) => {
  try {
    const pollId = generatePollId();
    
    // Initialize votes object
    const votes = {};
    pollData.options.forEach((_, index) => {
      votes[index] = 0;
    });

    const poll = {
      pollId,
      question: pollData.question,
      options: pollData.options,
      multipleChoice: pollData.multipleChoice || false,
      votes,
      voterIds: [],
      createdAt: serverTimestamp()
    };

    // Save to Firestore
    await setDoc(doc(db, 'polls', pollId), poll);

    return { pollId };
  } catch (error) {
    console.error('Error creating poll:', error);
    throw error;
  }
};

// Get poll by ID
export const getPoll = async (pollId) => {
  try {
    const pollRef = doc(db, 'polls', pollId);
    const pollSnap = await getDoc(pollRef);

    if (!pollSnap.exists()) {
      return null;
    }

    return pollSnap.data();
  } catch (error) {
    console.error('Error fetching poll:', error);
    throw error;
  }
};

// Submit vote
export const submitVote = async (pollId, optionIndices) => {
  try {
    const voterId = getVoterId();
    const pollRef = doc(db, 'polls', pollId);
    
    // Get current poll data to check if user has voted
    const pollSnap = await getDoc(pollRef);
    
    if (!pollSnap.exists()) {
      throw new Error('Poll not found');
    }

    const poll = pollSnap.data();
    
    // Check if user has already voted
    if (poll.voterIds && poll.voterIds.includes(voterId)) {
      throw new Error('You have already voted on this poll');
    }

    // Prepare update object
    const updates = {
      voterIds: arrayUnion(voterId)
    };

    // Increment vote counts for selected options
    optionIndices.forEach(index => {
      updates[`votes.${index}`] = increment(1);
    });

    // Update the poll
    await updateDoc(pollRef, updates);

    return { message: 'Vote recorded successfully' };
  } catch (error) {
    console.error('Error submitting vote:', error);
    throw error;
  }
};

// Get poll results
export const getResults = async (pollId) => {
  try {
    const poll = await getPoll(pollId);
    
    if (!poll) {
      return null;
    }

    const totalVotes = Object.values(poll.votes || {}).reduce((sum, count) => sum + count, 0);

    return {
      question: poll.question,
      options: poll.options,
      votes: poll.votes,
      totalVotes,
      multipleChoice: poll.multipleChoice,
      createdAt: poll.createdAt
    };
  } catch (error) {
    console.error('Error fetching results:', error);
    throw error;
  }
};

// Check if user has voted
export const checkVoted = async (pollId) => {
  try {
    const voterId = getVoterId();
    const poll = await getPoll(pollId);

    if (!poll) {
      return false;
    }

    return poll.voterIds && poll.voterIds.includes(voterId);
  } catch (error) {
    console.error('Error checking vote status:', error);
    return false;
  }
};
