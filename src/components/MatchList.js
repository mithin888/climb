
import Match from './Match';

const MatchList = props => {

  return (
    props.matches.map(match => {
      return (
        <Match
          key={match}
          puuid={props.puuid}
          id={match}>
          {match}
        </Match>
      );
    })
  );

};

export default MatchList;