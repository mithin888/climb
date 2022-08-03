import React from "react";


const Teams = props => {

  return (
    <React.Fragment>
      <div className="w-48 flex flex-row justify-center">
        <div className='w-20 mx-2'>
          <div className='truncate'>
            {props.match.data && props.match.team100.top.summonerName}
          </div>
          <div className='truncate'>
            {props.match.data && props.match.team100.jungle.summonerName}
          </div>
          <div className='truncate'>
            {props.match.data && props.match.team100.middle.summonerName}
          </div>
          <div className='truncate'>
            {props.match.data && props.match.team100.bottom.summonerName}
          </div>
          <div className='truncate'>
            {props.match.data && props.match.team100.support.summonerName}
          </div>
        </div>
        <div className='w-20 mx-2'>
          <div className='truncate'>
            {props.match.data && props.match.team200.top.summonerName}
          </div>
          <div className='truncate'>
            {props.match.data && props.match.team200.jungle.summonerName}
          </div>
          <div>
            {props.match.data && props.match.team200.middle.summonerName}
          </div>
          <div className='truncate'>
            {props.match.data && props.match.team200.bottom.summonerName}
          </div>
          <div className='truncate'>
            {props.match.data && props.match.team200.support.summonerName}
          </div>
        </div>
      </div>

    </React.Fragment>
  );
};

export default Teams;