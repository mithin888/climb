
import itemLibrary from '../../assets/item.json';
import ItemDetails from './ItemDetails';


const itemImage = item => {
  return `https://ddragon.leagueoflegends.com/cdn/12.13.1/img/item/${item}.png`;
};

const fillerImage = () => {
  return `https://ddragon.leagueoflegends.com/cdn/img/bg/F5141416.png`;
};


const Items = props => {

  return (
    <div>
      {props.items.map(item => {
        if (item === 0) {
          return (
            <img
              key={item}
              src="https://ddragon.leagueoflegends.com/cdn/img/bg/F5141416.png"
              width='25px'
            />
          );
        } else {
          return (
            <div
              key={item}
              className='p-0'
            >
              <img
                key={item}
                src={itemImage(item)}
                width='25px'
              />
              {/* </OverlayTrigger> */}
            </div>
          );
        }
      })}
    </div>
  );

};

export default Items;