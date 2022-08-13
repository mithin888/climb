import championLibrary from "../../assets/champion.json";

const Champion = props => {

  const championImage = championName => {
    return `https://ddragon.leagueoflegends.com/cdn/12.13.1/img/champion/${championName}.png`;
  };
  const champion = championLibrary.data[props.name];
  return (
    <img
      src={championImage(props.name)}
    />
  );
};

export default Champion;