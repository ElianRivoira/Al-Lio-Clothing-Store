import React from "react";
import { useLocation, useParams } from "react-router-dom";
import "../styles/Grid/style.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { searchCatProducts, searchProducts } from "../state/products";
import { useSelector } from "react-redux";
import GridCard from "./GridCard";

function Grid({ search }) {
  const dispatch = useDispatch();
  const clothes = useSelector(state => state.products.products);
  const filteredClothes = useSelector(state => state.products.filteredProducts)
  const params = useParams();
  const category = params.category;
  const location = useLocation();


  useEffect(() => {
    if (category) {
      dispatch(searchCatProducts(category));
    }
    if (search) {
      dispatch(searchProducts(search));
    }
  }, [category, search]);

  return (
    <div className="cardsContainer">
      {location.pathname==="/products" ? clothes.map((el, index) => (
        <GridCard el={el} key={index}/>
      ))
    :
    filteredClothes.map((el, index) => (
      <GridCard key={index} el={el} />
    ))}
    </div>
  );
}

export default Grid;
