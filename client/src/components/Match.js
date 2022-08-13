
import React, { useState, useEffect, useReducer } from 'react';

import myConfig from '../config/config';
import Champion from './match/Champion';
import Items from './match/Items';
import Runes from './match/Runes';
import SummonerSpells from './match/SummonerSpells';
import Teams from './match/Teams';
import Minions from './match/Minions';

// layout
import Button from './../layout/Button';


const matchReducer = (state, action) => {

  const player = action.val.info.participants.find(participant => participant.puuid === action.puuid);
  const team1 = action.val.info.participants.filter(participant => participant.teamId === 100);
  const team2 = action.val.info.participants.filter(participant => participant.teamId === 200);

  return {
    data: true,
    player: player,
    game: {
      gameCreation: action.val.info.gameCreation,
      gameDuration: action.val.info.gameDuration,
      gameStartTimestamp: action.val.info.gameStartTimestamp,
      gameEndTimestamp: action.val.info.gameEndTimestamp,
      gameId: action.val.info.gameId,
      gameMode: action.val.info.gameMode,
      gameVersion: action.val.info.gameVersion,
      mapId: action.val.info.mapId
    },
    team100: [
      team1.find(player => player.teamPosition === 'TOP'),
      team1.find(player => player.teamPosition === 'JUNGLE'),
      team1.find(player => player.teamPosition === 'MIDDLE'),
      team1.find(player => player.teamPosition === 'BOTTOM'),
      team1.find(player => player.teamPosition === 'UTILITY')
    ],
    team200: [
      team2.find(player => player.teamPosition === 'TOP'),
      team2.find(player => player.teamPosition === 'JUNGLE'),
      team2.find(player => player.teamPosition === 'MIDDLE'),
      team2.find(player => player.teamPosition === 'BOTTOM'),
      team2.find(player => player.teamPosition === 'UTILITY')
    ],
    notes: action.notes
  };
};

const Match = props => {

  const [showNotes, setNotes] = useState(false);
  const [matchData, setMatchData] = useReducer(matchReducer, {
    data: false,
    player: {},
    game: {},
    team100: [],
    team200: [],
    notes: {}
  });

  useEffect(() => {

    const fetchMatchNotes = async () => {
      try {
        const response = await fetch(`http://localhost:3080/billaeon/${props.id}`);
        const data = await response.json();

        setMatchData(
          {
            puuid: props.puuid,
            val: data.matchData,
            notes: data.matchNotes
          }
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchMatchNotes();
  }, [props.id, props.puuid]);

  const clickHandler = () => {
    setNotes(prevState => !prevState);
  };

  return (
    <React.Fragment>
      {matchData.data &&
        <div className='flex flex-col'>
          <div className={`box-content flex flex-row m-auto items-center my-2 ${matchData.player.win ? 'bg-indigo-900' : 'bg-pink-900'}`}>
            {matchData.data && <div className='w-12 mx-1'>
              <Champion
                id={matchData.player.championId}
                name={matchData.player.championName}
              />
            </div>}
            {matchData.data && <SummonerSpells
              spell1={matchData.player.summoner1Id}
              spell2={matchData.player.summoner2Id}
            />}
            <div className='mx-1 flex flex-col'>
              {matchData.data && <Runes
                runes={matchData.player.perks.styles}
                primaryId={matchData.player.perks.styles[0].style}
                secondaryId={matchData.player.perks.styles[1].style}
              />}
            </div>
            <div className='flex flex-col'>
              <div className='flex flex-row'>
                <div className='mx-2'>
                  <div className='text-center'>
                    {matchData.data && `${matchData.player.kills} / ${matchData.player.deaths} / ${matchData.player.assists}`}
                  </div>
                  <div className='text-center w-full'>
                    {`${((matchData.player.kills + matchData.player.assists) / matchData.player.deaths).toFixed(1)} KDA`}
                  </div>
                </div>
                <div className='mx-2'>
                  <div className='flex justify-center'>
                    <div className='px-1'>
                      {matchData.data && `${matchData.player.goldEarned.toLocaleString()}`}
                    </div>
                    <img alt="gold icon" className='self-center w-3 h-3' src='https://static.wikia.nocookie.net/leagueoflegends/images/1/10/Gold.png' />
                  </div>
                  <div className='flex justify-center'>
                    <div className='px-1'>
                      {matchData.data && `${matchData.player.challenges.goldPerMinute.toFixed(0)}`}
                    </div>
                    <img alt="gold icon" className='self-center w-3 h-3' src='https://static.wikia.nocookie.net/leagueoflegends/images/1/10/Gold.png' /> / min
                  </div>
                </div>
                {matchData.data && <Minions
                  totalMinionsKilled={matchData.player.totalMinionsKilled}
                  neutralMinionsKilled={matchData.player.neutralMinionsKilled}
                  totalCS={(matchData.player.totalMinionsKilled + matchData.player.neutralMinionsKilled).toFixed(0)}
                  gameDurationMin={matchData.game.gameDuration / 60}
                />}
              </div>
              {matchData.data && <Items
                items={[matchData.player.item0, matchData.player.item1, matchData.player.item2, matchData.player.item3, matchData.player.item4, matchData.player.item5, matchData.player.item6]}
                item0={matchData.player.item0}
                item1={matchData.player.item1}
                item2={matchData.player.item2}
                item3={matchData.player.item3}
                item4={matchData.player.item4}
                item5={matchData.player.item5}
                item6={matchData.player.item6}
              />}
            </div>
            <Teams match={matchData} />
            <button
              onClick={clickHandler}
              className={`px-px self-stretch ${matchData.player.win ? 'bg-indigo-700' : 'bg-pink-700'}`}>
              {!showNotes && <i className="pb-16 px-1 fa-solid fa-chevron-down"></i>}
              {showNotes && <i className="pt-16 px-1 fa-solid fa-chevron-up"></i>}
            </button>
          </div>
          {showNotes &&
            <div className='flex flex-col'>
              <div className='flex flex-row text-center'>
                <div className='w-1/4'>
                  Champion Knowledge
                  <ul>
                    {matchData.notes ? matchData.notes.champion_knowledge.map((note, index) => <li key={index}>{note}</li>) : "..."}
                  </ul>
                </div>
                <div className='w-1/4'>
                  Laning
                </div>
                <div className='w-1/4'>
                  Teamfighting
                </div>
                <div className='w-1/4'>
                  Macro
                </div>
              </div>
              <form className='flex flex-col m-auto mt-2 items-center'>
                <div className='flex flex-row justify-center py-2'>
                  <label className='px-2 w-20' htmlFor="tags">Category</label>
                  <select className='w-64' name="tags" id="tags">
                    <option value="Champion Knowledge">Champion Knowledge</option>
                    <option value="Laning">Laning</option>
                    <option value="Team Fighting">Team Fighting</option>
                    <option value="Macro">Macro</option>
                  </select>
                </div>
                <div className='flex flex-row justify-center py-2'>
                  <label className='px-2 w-20' htmlFor="note">Note</label>
                  <textarea className='h-20 w-64' name='note' />
                </div>
                <Button>Add Note</Button>
              </form>
            </div>
          }
        </div>}
    </React.Fragment>
  );

};

export default Match;