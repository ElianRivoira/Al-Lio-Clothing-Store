import { Box } from "@mui/system";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PasswordIcon from "@mui/icons-material/Password";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { usersRequests } from "../state/users";

import { useState } from "react";
import "../styles/Form/style.css";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    genre: "",
  });

  const registerHandler = () => {
    usersRequests
      .post("/register", user)
      .then(() => {
        navigate("/login");
      })
      .catch(err => console.log(err));
  };

  const handleInput = e => {
    const inputKey = e.target.id || e.target.name;
    setUser({ ...user, [inputKey]: e.target.value });
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
          Ingrese todos los datos para completar el registro:
        </h2>

        <div className="div-input">
          <TextField
            required
            id="name"
            label="Nombre de usuario"
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
            id="password"
            label="Contraseña"
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
          <TextField
            required
            label="Email"
            type="email"
            id="email"
            variant="filled"
            onChange={handleInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="div-input">
          <TextField
            required
            label="Ingrese su direccion"
            id="address"
            type="address"
            variant="filled"
            onChange={handleInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HomeIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="div-input">
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-filled-label">Sexo</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              name="genre"
              value={user.genre}
              onChange={handleInput}
            >
              <MenuItem value={"masculino"}>Masculino</MenuItem>
              <MenuItem value={"femenino"}>Femenino</MenuItem>
              <MenuItem value={"no binario"}>No binario</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="div-input" id="last-div">
          <div>
            <Button
              className="enviar-datos"
              variant="contained"
              onClick={registerHandler}
            >
              Registrarme
            </Button>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Register;
