
import React, { useState, useEffect } from 'react';

import myConfig from '../config/config';
import Champion from './Player/Champion';
import Items from './Player/Items';
import Runes from './Player/Runes';
import SummonerSpells from './Player/SummonerSpells';




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
      setData(true);
      setPlayer(match.info.participants.find(participant => participant.puuid === props.puuid));
    };
    fetchMatchData();
    // return () => {
    //   second
    // }
  }, [props.id, props.puuid]);


  return (
    <React.Fragment>
      {data && <Champion
        id={player.championId}
        name={player.championName}
      />}
      {data && <SummonerSpells
        spell1={player.summoner1Id}
        spell2={player.summoner2Id}
      />}
      {data && <Runes
        runes={player.perks.styles}
        primaryId={player.perks.styles[0].style}
        secondaryId={player.perks.styles[1].style}
      />}
      {/* {data && <Items
          items={[player.item0, player.item1, player.item2, player.item3, player.item4, player.item5, player.item6]}
          item0={player.item0}
          item1={player.item1}
          item2={player.item2}
          item3={player.item3}
          item4={player.item4}
          item5={player.item5}
          item6={player.item6}
        />} */}

      <div>{data && `User: ${props.puuid}`}</div>
      <div>{data && `Game Mode: ${matchData.info.gameMode}`}</div>
      <div>{data && `Participant 1: ${matchData.metadata.participants[0]}`}</div>
      <div>{data && `Participant 2: ${matchData.metadata.participants[1]}`}</div>
      <div>{data && `Participant 3: ${matchData.metadata.participants[2]}`}</div>
      <div>{data && `Participant 4: ${matchData.metadata.participants[3]}`}</div>
      <div>{data && `Participant 5: ${matchData.metadata.participants[4]}`}</div>
      <div>{data && `KDA: ${player.kills} / ${player.deaths} / ${player.assists}`}</div>
    </React.Fragment>
  );

};

export default Match;