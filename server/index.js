import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient, ObjectId } from 'mongodb';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
let db;
let pollsCollection;

const connectDB = async () => {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pollify');
    db = client.db('pollify');
    pollsCollection = db.collection('polls');
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Pollify API is running' });
});

// Create a new poll
app.post('/api/polls', async (req, res) => {
  try {
    const { question, options, multipleChoice } = req.body;

    // Validation
    if (!question || !options || options.length < 2) {
      return res.status(400).json({ error: 'Question and at least 2 options required' });
    }

    // Generate poll ID
    const pollId = generatePollId();

    // Create poll document
    const poll = {
      pollId,
      question,
      options,
      multipleChoice: multipleChoice || false,
      votes: {},
      voterIds: [], // Track unique voters
      createdAt: new Date(),
    };

    // Initialize votes
    options.forEach((_, index) => {
      poll.votes[index] = 0;
    });

    await pollsCollection.insertOne(poll);

    res.status(201).json({
      pollId,
      message: 'Poll created successfully',
    });
  } catch (error) {
    console.error('Error creating poll:', error);
    res.status(500).json({ error: 'Failed to create poll' });
  }
});

// Get poll by ID
app.get('/api/polls/:pollId', async (req, res) => {
  try {
    const { pollId } = req.params;
    const poll = await pollsCollection.findOne({ pollId });

    if (!poll) {
      return res.status(404).json({ error: 'Poll not found' });
    }

    // Return poll without internal MongoDB _id
    const { _id, voterIds, ...pollData } = poll;
    res.json(pollData);
  } catch (error) {
    console.error('Error fetching poll:', error);
    res.status(500).json({ error: 'Failed to fetch poll' });
  }
});

// Submit vote
app.post('/api/polls/:pollId/vote', async (req, res) => {
  try {
    const { pollId } = req.params;
    const { optionIndices, voterId } = req.body;

    if (!optionIndices || !Array.isArray(optionIndices) || optionIndices.length === 0) {
      return res.status(400).json({ error: 'Valid option indices required' });
    }

    if (!voterId) {
      return res.status(400).json({ error: 'Voter ID required' });
    }

    const poll = await pollsCollection.findOne({ pollId });

    if (!poll) {
      return res.status(404).json({ error: 'Poll not found' });
    }

    // Check if voter has already voted
    if (poll.voterIds && poll.voterIds.includes(voterId)) {
      return res.status(400).json({ error: 'You have already voted on this poll' });
    }

    // Update votes
    const updates = {};
    optionIndices.forEach(index => {
      const key = `votes.${index}`;
      updates[key] = (poll.votes[index] || 0) + 1;
    });

    await pollsCollection.updateOne(
      { pollId },
      {
        $set: updates,
        $push: { voterIds: voterId },
      }
    );

    res.json({ message: 'Vote recorded successfully' });
  } catch (error) {
    console.error('Error submitting vote:', error);
    res.status(500).json({ error: 'Failed to submit vote' });
  }
});

// Get poll results
app.get('/api/polls/:pollId/results', async (req, res) => {
  try {
    const { pollId } = req.params;
    const poll = await pollsCollection.findOne({ pollId });

    if (!poll) {
      return res.status(404).json({ error: 'Poll not found' });
    }

    const totalVotes = Object.values(poll.votes).reduce((sum, count) => sum + count, 0);

    res.json({
      question: poll.question,
      options: poll.options,
      votes: poll.votes,
      totalVotes,
      multipleChoice: poll.multipleChoice,
      createdAt: poll.createdAt,
    });
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ error: 'Failed to fetch results' });
  }
});

// Check if voter has voted
app.post('/api/polls/:pollId/check-vote', async (req, res) => {
  try {
    const { pollId } = req.params;
    const { voterId } = req.body;

    if (!voterId) {
      return res.status(400).json({ error: 'Voter ID required' });
    }

    const poll = await pollsCollection.findOne({ pollId });

    if (!poll) {
      return res.status(404).json({ error: 'Poll not found' });
    }

    const hasVoted = poll.voterIds && poll.voterIds.includes(voterId);
    res.json({ hasVoted });
  } catch (error) {
    console.error('Error checking vote:', error);
    res.status(500).json({ error: 'Failed to check vote status' });
  }
});

// Helper function to generate poll ID
function generatePollId() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < 8; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

// Start server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Pollify API server running on http://localhost:${PORT}`);
  });
};

startServer();

