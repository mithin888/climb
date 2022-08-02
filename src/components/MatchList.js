import React from 'react';
import Match from './Match';

const MatchList = props => {

  return (
    props.matches.map(match => {
      return (
        <React.Fragment>
          <Match
            key={match}
            puuid={props.puuid}
            id={match}>
            {match}
          </Match>
        </React.Fragment>
      );
    })
  );

};

export default MatchList;