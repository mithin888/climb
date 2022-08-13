import 'dotenv/config';
import axios from 'axios';

import client from '../database/mongoDB.js';


export const fetchPUUID = async (summonerName) => {
  const summoner = await axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`, {
    headers: {
      'X-Riot-Token': process.env.X_RIOT_TOKEN
    }
  });
  return summoner.data.puuid;
};

export const fetchMatchData = async (matchId) => {
  const match = await axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}
  `, {
    headers: {
      'X-Riot-Token': process.env.X_RIOT_TOKEN
    }
  });
  return match.data;
};

const fetchMatchNotes = async (summonerName, matchId) => {

  const puuid = await fetchPUUID(summonerName);
  const matchData = await fetchMatchData(matchId);

  try {
    const database = client.db("climb");
    const summoner = database.collection(puuid);

    // query for entries that have a specific matchId
    const query = {
      matchId: { $eq: matchId },
    };

    const matchNotes = await summoner.findOne(query);
    // print a message if no documents were found
    if ((await summoner.estimatedDocumentCount()) === 0) {
      console.log("No documents found!");
    }
    return {
      matchNotes: matchNotes,
      matchData: matchData
    };
  } catch (error) {
    console.error('Connection to MongoDB failed', error);
  };
};

export default fetchMatchNotes;