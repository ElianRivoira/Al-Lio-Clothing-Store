import React from "react";
import {usersRequests} from "../state/users";

const MiPerfil = ({ users, setUsers }) => {

const setAdmin = (id)=>{
  usersRequests.put(`/admin/${id}`).then(
    usersRequests.get("/").then(users=>{
      setUsers(users.data)
    })
  )
}

const setUser = (id)=>{
  usersRequests.put(`/user/${id}`).then(
    usersRequests.get("/").then(users=>{
      setUsers(users.data)
    })
  )
}

  return (
    <div>
      {users.length ? 
      users.map(user => 
      <div key={user.id}>
        <p>Nombre de usuario: <strong>{user.name}</strong> -Tipo: <strong>{user.type}</strong></p>
        <button onClick={()=>setAdmin(user.id)}>setAdmin</button>
        <button onClick={()=>setUser(user.id)}>setUser</button>
      </div>
      ) 
      : null}
    </div>
  );
};

export default MiPerfil;
