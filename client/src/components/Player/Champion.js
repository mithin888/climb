import championLibrary from "../../assets/champion.json";

import Image from 'react-bootstrap/Image';

const Champion = props => {

  const championImage = championName => {
    return `https://ddragon.leagueoflegends.com/cdn/12.13.1/img/champion/${championName}.png`;
  };
  const champion = championLibrary.data[props.name];
  return (
    <Image
      src={championImage(props.name)}
      width='50px'
    />
  );
};

export default Champion;