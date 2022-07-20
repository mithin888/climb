import itemLibrary from '../../assets/item.json';
const string = JSON.stringify(itemLibrary);
const allItems = JSON.parse(string);

const Items = props => {

  return (
    <div>
      <h4>Items</h4>
      <ul>
        {props.items.map(item => {
          return (<li key={item}>{allItems.data[item].name}</li>);
        })}
      </ul>
    </div>
  );

};

export default Items;