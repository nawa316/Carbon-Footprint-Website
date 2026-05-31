import express from 'express';
import { getLeaderboard } from '../controllers/LeaderboardController.js';

const router = express.Router();

// Endpoint: GET /api/leaderboard
router.get('/', getLeaderboard);

export default router;
