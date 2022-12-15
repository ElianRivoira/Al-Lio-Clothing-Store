import React from 'react';
import { Link } from "react-router-dom";

const GridCard = ({el}) => {
    return (
      <Link className="clothingGridCard" to={`/${el.id}`}>
      <img
        className="clothingGridImg"
        src={el.img[0]}
        alt={`${el.category} ${el.name}`}
      ></img>
      <div className="clothingGridDescription">
        <h2 className="gridClothingName">{el.name}</h2>
        <h2>${el.price}</h2>
      </div>
    </Link>
      );
}

export default GridCard