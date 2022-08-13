import React from "react";

import runesLibrary from "../../assets/runesReforged.json";

import Image from 'react-bootstrap/Image';


const runeImage = rune => {
  return `https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`;
};

const Runes = props => {

  // return rune object from static assets given the ID of a given rune tree
  const fetchRuneObject = runeTreeId => {
    return runesLibrary.find(runeTree => runeTree.id === runeTreeId);
  };

  // return specific rune slot object from static assets given the string 'primary' or 'secondary' and rune slot number
  const fetchRuneSlot = (tree, runeSlot) => {
    let runeTree;
    let j;
    if (tree === 'primary') {
      runeTree = fetchRuneObject(props.primaryId);
      j = 0;
    } else if (tree === 'secondary') {
      runeTree = fetchRuneObject(props.secondaryId);
      j = 1;
    }
    for (let i = 0; i < 4; i++) {
      const rune = runeTree.slots[i].runes.find(slot => slot.id === props.runes[j].selections[runeSlot - 1].perk);
      if (rune) return rune;
    }
  };

  // return array of rune slot objects from static assets given the string 'primary' or 'secondary'
  const createRuneArray = (tree) => {
    let slotNumber;
    if (tree === 'primary') {
      slotNumber = 4;
    } else if (tree === 'secondary') {
      slotNumber = 2;
    }
    const array = [];
    for (let i = 1; i < slotNumber + 1; i++) {
      const rune = fetchRuneSlot(tree, i);
      array.push(rune);
    }
    return array;
  };

  const primaryRuneArray = createRuneArray('primary');
  const secondaryRuneArray = createRuneArray('secondary');

  return (
    <React.Fragment>
      {primaryRuneArray.map(rune => {
        return (
          <Image
            key={rune.id}
            src={runeImage(rune)}
            width='25px'
          />
        );
      })}
      {secondaryRuneArray.map(rune => {
        return (
          <Image
            key={rune.id}
            src={runeImage(rune)}
            width='25px'
          />
        );
      })}
    </React.Fragment>
  );
};

export default Runes;