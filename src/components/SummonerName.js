import { useState } from 'react';

import MatchList from "./MatchList";

// backend config
import myConfig from './../config/config';

// bootstrap
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';



const fetchPUUID = async (summonerName) => {
  console.log('request sent');
  const response = await fetch(`${myConfig.proxyUrl}https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`, {
    headers: {
      'X-Riot-Token': process.env.REACT_APP_X_RIOT_TOKEN
    }
  });
  const data = await response.json();
  return data.puuid;
};

const fetchMatches = async (puuid) => {
  console.log('request sent');
  const response = await fetch(`${myConfig.proxyUrl}https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5`, {
    headers: {
      'X-Riot-Token': process.env.REACT_APP_X_RIOT_TOKEN
    }
  });
  const matchesArray = await response.json();
  return matchesArray;
};

const SummonerName = () => {

  const [puuid, setPuuid] = useState('');
  const [matches, setShowMatches] = useState([]);
  const clickHandler = async () => {
    const id = await fetchPUUID(myConfig.summonerName);
    setPuuid(id);
    const matchHistory = await fetchMatches(id);
    setShowMatches(matchHistory);
  };

  return (
    <Container>
      <Button onClick={clickHandler}>Search
      </Button>
      <Accordion>
        <MatchList
          puuid={puuid}
          matches={matches} />
      </Accordion>
    </Container>
  );

};


export default SummonerName;