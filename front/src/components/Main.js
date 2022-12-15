import React from "react";
import { Link } from "react-router-dom";
import bannerColeccion from "../assets/imagenes/bannerColeccion.png";
import remera from "../assets/imagenes/remera.png";
import pantalon from "../assets/imagenes/pantalon.png";
import abrigo from "../assets/imagenes/abrigo.png";
import "../styles/Main/styles.css";

const Main = () => {
  return (
    <div>
      <div>
        <Link to="/products" className="linkBanner">
          <img
            src={bannerColeccion}
            alt="colección"
            className="bannerContainer"
          ></img>
        </Link>
      </div>

      <div className="containerCat">
        <Link className="fotoCategoria" to="/cat/remera">
          <img className="catPicture" src={remera} alt="Remeras"></img>
          <div className="titCat">
            <p>REMERAS</p>
          </div>
        </Link>

        <Link className="fotoCategoria" to="/cat/pantalon">
          <img className="catPicture" src={pantalon} alt="Pantalones"></img>
          <div className="titCat">
            <p>PANTALONES</p>
          </div>
        </Link>

        <Link className="fotoCategoria" to="/cat/buzo">
          <img className="catPicture" src={abrigo} alt="Abrigos"></img>

          <div className="titCat">
            <p>BUZOS</p>
          </div>
        </Link>
      </div>

      <div className="footer">
        Al lio © 2022. Todos los derechos reservados.
      </div>
    </div>
  );
};

export default Main;
