import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import BarraDeBusqueda from "./BarraDeBusqueda";
import "../styles/Navbar/Style.css";
import img from "../assets/imagenes/Logo_pagina.png";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../state/users";
import AddIcon from "@mui/icons-material/Add";

const Navbar = ({search, handleSearch}) => {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.users.userData);

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <div className="Navbar">
      <Link to="/">
        <img src={img} alt="alLioLogo" className="imagen" />
      </Link>
    
      <BarraDeBusqueda className="barrita-de-busqueda" handleSearch={handleSearch} search={search} />

      <div className="caja-botones">
        {!usuario.name ? (
         <>
            <Link to="/cart">
              <Button
                startIcon={<ShoppingCartIcon />}
                className="Boton"
                style={{
                  backgroundColor: "#ead7c3",
                  color: "black",
                  fontFamily: "Canaro",
                }}
              >
                Mi carrito
              </Button>
            </Link>
            <Link to="/login">
              <Button
                className="Boton"
                startIcon={<LoginIcon />}
                style={{
                  backgroundColor: "#ead7c3",
                  color: "black",
                  fontFamily: "Canaro",
                }}
              >
                Ingresar
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                className="Boton"
                startIcon={<LoginIcon />}
                style={{
                  backgroundColor: "#ead7c3",
                  color: "black",
                  fontFamily: "Canaro",
                }}
              >
                Registrarse
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/profile">
              <Button
                startIcon={<PersonIcon />}
                className="Boton"
                style={{
                  backgroundColor: "#ead7c3",
                  color: "black",
                  fontFamily: "Canaro",
                }}
              >
                {usuario.name}
              </Button>
            </Link>

            <Link to="/cart">
              <Button
                startIcon={<ShoppingCartIcon />}
                className="Boton"
                style={{
                  backgroundColor: "#ead7c3",
                  color: "black",
                  fontFamily: "Canaro",
                }}
              >
                Mi carrito
              </Button>

            </Link>
            <Link to="/add">
              <Button
                startIcon={<AddIcon />}
                className="Boton"
                style={{
                  backgroundColor: "#ead7c3",
                  color: "black",
                  fontFamily: "Canaro",
                }}
              >
                Agregar producto
              </Button>
            </Link>

            <Link to="/login">
              <Button
                startIcon={<LogoutIcon />}
                className="Boton"
                onClick={handleLogOut}
                style={{
                  backgroundColor: "#ead7c3",
                  color: "black",
                  fontFamily: "Canaro",
                }}
              >
                Salir
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
