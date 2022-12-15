import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const localStorageUserData = JSON.parse(localStorage.getItem("loggedInUser"));
//VALOR INICIAL DE NUESTRO ESTADO USER, SI HAY ALGO GUARDADO EN LOCALSTORAGE, ESO VA A SER NUESTRO ESTADO PREDETERMINADO, SINO SETEAMOS UNO VACÍO, ASÍ LOGRAMOS LA PERSISTENCIA.
const initialState = localStorageUserData
  ? {
      isLoading: false,
      userData: localStorageUserData, //ACÁ ALOJAMOS LA INFORMACIÓN DEL USUARIO.
    }
  : {
      isLoading: true,
      userData: {}, //ACÁ ALOJAMOS LA INFORMACIÓN DEL USUARIO.
    };

export const usersRequests = axios.create({
  //ACÁ CREÉ UNA INSTANCIA DE AXIOS Y LE MODIFIQUÉ LA BASE URL PARA TENER UN CÓDIGO MÁS LIMPIO.
  baseURL: "http://localhost:3001/api/users",
});

export const signUp = createAsyncThunk("SIGN_UP", (userData) => {
  //EL PRIMER ARGUMENTO DE createAsyncThunk ES EL NOMBRE QUE LE PONEMOS A LA ACCIÓN. LUEGO, EL SEGUNDO ARGUMENTO SERÁ UNA CALLBACK FUNCTION QUE PUEDE O NO RECIBIR UN ARGUMENTO(EL ARGUMENTO SE LE SERÁ DADO EN EL DISPATCH, POR EJEMPLO SI NECESITO LOGUEAR A UN USUARIO Y NECESITO PASARLE UN OBJETO CON LA INFORMACIÓN DEL USUARIO, SE LO PASO EN EL DISPATCH Y LUEGO EN ESTA CALLBACK FUNCTION REDUX TRABAJA CON ESA INFORMACIÓN.)
  return usersRequests
    .post("/register", userData)
    .then((createdUser) => createdUser.data)
    .catch((error) => {
      throw new Error(error.message); //TIENE QUE SER THROW PARA QUE LA PROMESA FALLE CORRECTAMENTE, SINO SIEMPRE TERMINA EN FULFILLED
    });
});
export const logIn = createAsyncThunk("LOG_IN", (userData) => {
  return usersRequests
    .post("/login", userData)
    .then((loggedInUser) => loggedInUser.data)
    .catch((error) => {
      throw new Error(error.message);
    });
});

const usersSlice = createSlice({
  name: "users", //DEFINIMOS NOMBRE DEL SLICE
  initialState, //ACÁ ESTÁ VALOR INICIAL DEL STATE, DEFINIDO PREVIAMENTE
  reducers: {
    //ACÁ HAY REDUCERS SINCRONICOS, DE LOS QUE NOS ENSEÑARON EN EL BOOTCAMP
    logOut: (state) => {
      state.userData = {};
      localStorage.removeItem("loggedInUser");
      alert(`You've been logged out successfully`);
    },
  },
  extraReducers: {
    //ESTOS SON LOS REDUCERS ASINCRÓNICOS, A CADA UNO DE LOS ESTADOS DE LA PROMESA LE CORRESPONDE UNA ACCIÓN DETERMINADA.
    [signUp.pending]: (state) => {
      state.isLoading = true;
    },
    [signUp.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.userData = action.payload;
    },
    [signUp.rejected]: (state) => {
      state.isLoading = false;
    },
    [logIn.pending]: (state) => {
      state.isLoading = true;
    },
    [logIn.fulfilled]: (state, action) => {
      state.isLoading = false;
      localStorage.setItem("loggedInUser", JSON.stringify(action.payload));

      state.userData = action.payload;
    },
    [logIn.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});
export const { logOut } = usersSlice.actions;

//LUEGO EXPORTAMOS LA PROPIEDAD reducer DEL SLICE PARA USARLA COMO REDUCER EN NUESTRA STORE.
export default usersSlice.reducer;
