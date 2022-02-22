import React from "react";
import {Navigate} from "react-router-dom"; 

const Home = () => {
  
  if (localStorage.getItem("token") === null) {
    return <Navigate to="/login" />;
  }

  const logout = () => {
    localStorage.clear();
    window.location = "/login";
  };

  return (
    <>
      <p>Home Page</p>
      <button onClick={logout}>Logout</button>
    </>
  );
};
export default Home;