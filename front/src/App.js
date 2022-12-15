import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Grid from "./commons/Grid";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Login from "./components/Login";
import Register from "./components/Register";
import Item from "./commons/Item";
import Cart from "./components/Cart";
import AddProduct from "./components/AddProduct";
import { useDispatch } from "react-redux";
import { getAllProducts } from "./state/products";
import MiPerfil from "./components/MiPerfil";
import { usersRequests } from "./state/users";
import CartTest from "./components/CartTest";
import Checkout from "./components/Checkout";

function App() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  const handleSearch = e => {
    if (e.key === "Enter") {
      setSearch(e.target.value);
    }
    console.log(e.key);
  };

  useEffect(() => {
    dispatch(getAllProducts());
    usersRequests.get("/").then(users => {
      setUsers(users.data);
    });
  }, []);

  return (
    <div className="App">
      <Navbar search={search} handleSearch={handleSearch} />
      <div className="bodyContainer">
        <Routes>
          <Route path="/test" element={<CartTest />}></Route>
          <Route path="/" element={<Main />}></Route>
          <Route path="/:id" element={<Item />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/products" element={<Grid search={search} />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Register />}></Route>
          <Route path="/add" element={<AddProduct />}></Route>
          <Route path="/cat/:category" element={<Grid />}></Route>
          <Route
            path="/profile"
            element={<MiPerfil users={users} setUsers={setUsers} />}
          ></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
