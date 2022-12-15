import React from "react";
import { useParams } from "react-router";
import { clothesArray } from "../utils/dummyClothes";
import Grid from "./Grid";
import "../styles/Categoria/style.css";

const Categoria = () => {
  const params = useParams();
  const categoria = params.categoria;
  return (
    <div>
      <h1 className="tituloCategoria">{categoria}</h1>
      <Grid clothes={clothesArray} />
    </div>
  );
};

export default Categoria;
