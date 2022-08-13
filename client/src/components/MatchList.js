import React from 'react';
import Match from './Match';

const MatchList = props => {

  return (
    <div className='my-4'>
      {props.matches.map(match => {
        return (
          <Match
            key={match}
            puuid={props.puuid}
            id={match}>
            {match}
          </Match>
        );
      })}
    </div>
  );

};

export default MatchList;