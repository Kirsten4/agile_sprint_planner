import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const propertyName = event.target.name;
    const newUserCopy = { ...newUser };
    newUserCopy[propertyName] = event.target.value;
    setNewUser(newUserCopy);
  };

  const signUp = (event) => {
    event.preventDefault();
    axios.post("http://localhost:5000/signup", newUser).then(
      (res) => {
        console.log(res);
        window.location = "/login";
      },
      (err) => {
        console.log(err.response);
        setError(err.response.data.error);
      }
    );
  };

  return (
    <>
      <h1>Signup page</h1>
      <form onSubmit={signUp}>
        Username:{" "}
        <input
          type="text"
          name="username"
          value={newUser.username}
          onChange={handleChange}
        />
        Password:{" "}
        <input
          type="password"
          value={newUser.password}
          name="password"
          onChange={handleChange}
        />
        <input type="submit" value="Sign Up" />
      </form>
      <p>{error}</p>
    </>
  );
};
export default SignUp;
