
import Champion from "./Champion";

const Participant = props => {

  return (
    <div className="flex flex-row">
      {props.player.teamId === 200 &&
        <div className='w-4'>
          <Champion name={props.player.championName} />
        </div>
      }
      <div className="w-20 mx-2 truncate">
        {props.player.summonerName}
      </div>
      {props.player.teamId === 100 &&
        <div className='w-4'>
          <Champion name={props.player.championName} />
        </div>
      }
    </div>

  );
};

export default Participant;