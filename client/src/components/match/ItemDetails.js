import classes from "./ItemDetails.module.css";
import parse from 'html-react-parser';



const itemDescription = props => {

  const regex = keyword => {
    const re = new RegExp(`(?<=<)(${keyword})(?=>)`, 'g');
    return re;
  };
  const parseTags = (item) => {
    const keywords = [
      'mainText',
      'status',
      'stats',
      'attention',
      'active',
      'rarityGeneric',
      'healing',
      'OnHit',
      'passive',
      'scaleLevel',
      'magicDamage',
      'rules',
      'rarityLegendary',
      'rarityMythic',
      'speed',
      'scaleAP'
    ];
    for (let i = 0; i < keywords.length; i++) {
      item = item.replace(regex(keywords[i]), `span className='${classes[keywords[i]]}'`);
    }
    return item;
  };

  // opening tags
  let value = props.description;
  const newOpeningTags = parseTags(value);
  // closing tags
  const closingTags = /(?<=\/)(.*?)(?=>)/g;
  const newDescriptionTags = newOpeningTags.replace(closingTags, "span");

  return (
    <div className="">
      {parse(newDescriptionTags)}
    </div>
  );

};

export default itemDescription;