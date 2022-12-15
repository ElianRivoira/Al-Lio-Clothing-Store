import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PasswordIcon from "@mui/icons-material/Password";
import { logIn } from "../state/users";
import "../styles/Form/style.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const inputKey = e.target.id;
    setInput({ ...input, [inputKey]: e.target.value });
  };

  const loginHandler = () => {
    dispatch(logIn(input))
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
    
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div className="container">
        <h2 className="title">
          Bienvenido!! ingrese su usuario y contraseña porfavor:
        </h2>
        <div className="div-input">
          <TextField
            required
            label="E-mail"
            id="email"
            variant="filled"
            onChange={handleInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="div-input">
          <TextField
            required
            label="Password"
            id="password"
            type="password"
            autoComplete="current-password"
            variant="filled"
            onChange={handleInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PasswordIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="div-input">
          <div>
            <Button onClick={loginHandler} variant="contained">
              Ingresar
            </Button>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Login;
