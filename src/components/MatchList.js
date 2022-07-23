
import Match from './Match';

import Accordion from 'react-bootstrap/Accordion';

const MatchList = props => {

  return (
    props.matches.map(match => {
      return (
        <Accordion.Item
          eventKey={match}
          className='mb-4'
          key={match}>
          <Match
            key={match}
            puuid={props.puuid}
            id={match}>
            {match}
          </Match>
        </Accordion.Item>
      );
    })
  );

};

export default MatchList;