import express from 'express';
import {getAllSymbols, getLeaderboard} from '../controllers/trade-controller.js'


const router = express.Router();


router.route("/allsymbols").get(getAllSymbols);
router.route("/leaderboard").get(getLeaderboard);

export default router;