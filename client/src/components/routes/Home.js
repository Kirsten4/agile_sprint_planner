import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import TaskListContainer from "../../containers/TaskListContainer";
import ProjectContainer from "../../containers/ProjectContainer";

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
      <ProjectContainer />
      <TaskListContainer />
    </>
  );
};
export default Home;