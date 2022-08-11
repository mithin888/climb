import express from 'express';

import fetchMatchNotes from './../controllers/fetchMatchNotes.js';
import { fetchPUUID, fetchMatchData } from './../controllers/fetchMatchNotes.js';


const router = express.Router();
/* GET home page. */
router
  .get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
  })
  .get('/:summonerName/:matchId', async (req, res, next) => {
    console.log('request received');
    const { summonerName, matchId } = req.params;
    const data = await fetchMatchNotes(summonerName, matchId);
    res.status(200).send(data);
  });



export default router;
