
import { useState, useEffect } from 'react';

import myConfig from '../config/config';
import Items from './Player/Items';



const Match = props => {


  const [data, setData] = useState(false);
  const [matchData, setMatchData] = useState({});
  const [player, setPlayer] = useState([]);

  useEffect(() => {
    const fetchMatchData = async () => {
      const response = await fetch(`${myConfig.proxyUrl}https://americas.api.riotgames.com/lol/match/v5/matches/${props.id}`, {
        headers: {
          'X-Riot-Token': process.env.REACT_APP_X_RIOT_TOKEN
        }
      });
      const match = await response.json();
      setMatchData(match);
      console.log('running');
      setData(true);
      setPlayer(match.info.participants.filter(participant => participant.puuid === props.puuid));
    };
    fetchMatchData();
    // return () => {
    //   second
    // }
  }, [props.id, props.puuid]);


  return (
    <li>Game ID: {props.children}
      <div>{data && `User: ${props.puuid}`}</div>
      <div>{data && `Game Mode: ${matchData.info.gameMode}`}</div>
      <div>{data && `Participant 1: ${matchData.metadata.participants[0]}`}</div>
      <div>{data && `Participant 2: ${matchData.metadata.participants[1]}`}</div>
      <div>{data && `Participant 3: ${matchData.metadata.participants[2]}`}</div>
      <div>{data && `Participant 4: ${matchData.metadata.participants[3]}`}</div>
      <div>{data && `Participant 5: ${matchData.metadata.participants[4]}`}</div>
      <div>{data && `Summoner Spells: ${matchData.info.gameMode}`}</div>
      <div>{data && `Runes: ${matchData.info.gameMode}`}</div>
      <div>{data && `KDA: ${player[0].kills} / ${player[0].deaths} / ${player[0].assists}`}</div>
      {data && <Items items={[player[0].item0, player[0].item1, player[0].item2, player[0].item3, player[0].item4, player[0].item5, player[0].item6,]} />}
    </li>
  );

};

export default Match;