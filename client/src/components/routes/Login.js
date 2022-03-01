import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Login = ({fetchCurrentUser}) => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  if (localStorage.getItem("token")) {
    return <Navigate to="/" />;
  }

  const handleChange = (event) => {
    const copiedUser = { ...user };
    const propertyName = event.target.name;
    copiedUser[propertyName] = event.target.value;
    setUser(copiedUser);
  };

  const login = (event) => {
    event.preventDefault();
    axios.post("http://localhost:5000/login", user)
    .then(res => {
        if (res.status === 200){
            localStorage.setItem('token', res.data.token)
            fetchCurrentUser(user)
            }
    }, err => {console.log(err.response);
    setError(err.response.data.error);}    
    );
  };

  return (
    <>
      <h1>Login Page</h1>
      <form onSubmit={login}>
        Username:
        <input
          type="text"
          value={user.username}
          name="username"
          onChange={handleChange}
        />
        Password:
        <input
          type="password"
          value={user.password}
          name="password"
          onChange={handleChange}
        />
        <input type="submit" value="Login" />
      </form>
    </>
  );
};
export default Login;