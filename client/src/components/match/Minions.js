

const Minions = props => {

  return (
    <div className='mx-2'>
      <div className='flex justify-center'>
        <div className='px-1'>
          {props.totalCS} CS
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='px-1'>
          {(props.totalCS / props.gameDurationMin).toFixed(1)} CS / min
        </div>
      </div>
    </div>
  );
};

export default Minions;