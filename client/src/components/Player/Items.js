
import itemLibrary from '../../assets/item.json';
import ItemDetails from './ItemDetails';

// bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';


const itemImage = item => {
  return `https://ddragon.leagueoflegends.com/cdn/12.13.1/img/item/${item}.png`;
};

const popover = item => {

  const itemName = itemLibrary.data[item].name;
  // const itemStats = /<stats>(.*?)<\/stats>/.toString(allItems.data[item].description);
  // console.log(itemStats);

  const itemDetails = itemLibrary.data[item].description;
  const itemCost = itemLibrary.data[item].gold.base;

  return (
    <Popover>
      <Popover.Header as="h3">{itemName}</Popover.Header>
      <Popover.Body>
        <p>Gold: {itemCost}</p>
        <ItemDetails description={itemDetails} />
      </Popover.Body>
    </Popover>
  );
};

const Items = props => {

  return (
    <Container className='mb-4'>
      <Row
        className='float-start'>
        {props.items.map(item => {
          console.log(item);
          return (
            <Col
              key={item}
              className='p-0'
            >
              {/* <OverlayTrigger key={item} trigger={["hover", "focus", "click"]} placement="right" overlay={popover(item)}> */}
              <Image
                key={item}
                src={itemImage(item)}
                width='25px'
              />
              {/* </OverlayTrigger> */}
            </Col>
          );
        })}
      </Row>
    </Container>
  );

};

export default Items;