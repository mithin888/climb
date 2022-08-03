
import React, { useState, useEffect, useReducer } from 'react';

import myConfig from '../config/config';
import Champion from './match/Champion';
import Items from './match/Items';
import Runes from './match/Runes';
import SummonerSpells from './match/SummonerSpells';
import Teams from './match/Teams';


const matchReducer = (state, action) => {

  const player = action.val.info.participants.find(participant => participant.puuid === action.puuid);

  const team1 = action.val.info.participants.filter(participant => participant.teamId === 100);
  const team2 = action.val.info.participants.filter(participant => participant.teamId === 200);

  return {
    data: true,
    player: player,
    team100: {
      id: 100,
      top: team1.find(player => player.teamPosition === 'TOP'),
      jungle: team1.find(player => player.teamPosition === 'JUNGLE'),
      middle: team1.find(player => player.teamPosition === 'MIDDLE'),
      bottom: team1.find(player => player.teamPosition === 'BOTTOM'),
      support: team1.find(player => player.teamPosition === 'UTILITY')
    },
    team200: {
      id: 200,
      top: team2.find(player => player.teamPosition === 'TOP'),
      jungle: team2.find(player => player.teamPosition === 'JUNGLE'),
      middle: team2.find(player => player.teamPosition === 'MIDDLE'),
      bottom: team2.find(player => player.teamPosition === 'BOTTOM'),
      support: team2.find(player => player.teamPosition === 'UTILITY')
    }
  };
};

const Match = props => {

  const [matchData, setMatchData] = useReducer(matchReducer, {
    data: false,
    player: {},
    team100: [],
    team200: [],
  });

  useEffect(() => {
    const fetchMatchData = async () => {
      const response = await fetch(`${myConfig.proxyUrl}https://americas.api.riotgames.com/lol/match/v5/matches/${props.id}`, {
        headers: {
          'X-Riot-Token': process.env.REACT_APP_X_RIOT_TOKEN
        }
      });
      const match = await response.json();
      setMatchData({ puuid: props.puuid, val: match });
    };
    fetchMatchData();
    // return () => {
    //   second
    // }
  }, [props.id, props.puuid]);

  return (
    <React.Fragment>
      <div className={`flex flex-row m-auto items-center my-2 py-1 ${matchData.player.win ? 'bg-indigo-900' : 'bg-rose-900'}`}>
        <div className='mx-1'>
          {matchData.data && <Champion
            id={matchData.player.championId}
            name={matchData.player.championName}
          />}
        </div>
        <div className='my-px space-y-2'>
          {matchData.data && <SummonerSpells
            spell1={matchData.player.summoner1Id}
            spell2={matchData.player.summoner2Id}
          />}
        </div>
        <div className='mx-1 flex flex-col'>
          {matchData.data && <Runes
            runes={matchData.player.perks.styles}
            primaryId={matchData.player.perks.styles[0].style}
            secondaryId={matchData.player.perks.styles[1].style}
          />}
        </div>
        <div className='w-64 flex flex-row'>
          <div className='mx-2 w-20'>
            <div className='text-center'>
              {matchData.data && `${matchData.player.kills} / ${matchData.player.deaths} / ${matchData.player.assists}`}
            </div>
            <div className='text-center'>
              {`${((matchData.player.kills + matchData.player.assists) / matchData.player.deaths).toFixed(1)} KDA`}
            </div>
          </div>
          <div className='mx-2 w-28'>
            <div className='text-center'>
              9,671 Gold
            </div>
            <div className='text-center'>
              383 Gold/min
            </div>
          </div>
          <div className='mx-2 w-28'>
            <div className='text-center'>
              195 CS
            </div>
            <div className='text-center'>
              7.72 CS/min
            </div>
          </div>
        </div>
        <Teams match={matchData} />
      </div>

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

      {/* <div>{data && `Game Mode: ${matchData.info.gameMode}`}</div> */}
      {/* <div>{data && `Participant 1: ${matchData.metadata.participants[0]}`}</div>
      <div>{data && `Participant 2: ${matchData.metadata.participants[1]}`}</div>
      <div>{data && `Participant 3: ${matchData.metadata.participants[2]}`}</div>
      <div>{data && `Participant 4: ${matchData.metadata.participants[3]}`}</div>
      <div>{data && `Participant 5: ${matchData.metadata.participants[4]}`}</div> */}
    </React.Fragment>
  );

};

export default Match;