import express from 'express';
import { getLeaderboard } from '../controllers/leaderboardController.js';

const router = express.Router();

// Endpoint: GET /api/leaderboard
router.get('/', getLeaderboard);

export default router;