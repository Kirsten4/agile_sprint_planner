import { Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Login from "./components/routes/Login";
import SignUp from "./components/routes/Signup";
import Home from "./components/routes/Home";
import UsersService from "./services/UsersService";
import { useState, useEffect } from "react"

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const fetchCurrentUser = (user) => {
    UsersService.getUserByUsername(user.username)
      .then(currentUser => {
        setCurrentUser(currentUser)        
      })
  }

  return (
    <div className="App" >
      {/* <h2>The current user is: {currentUser.name}</h2> */}
      <Routes>
        <Route path="/" element={<Home currentUser={currentUser}/>} />
        <Route path="/login" element={<Login fetchCurrentUser={fetchCurrentUser} />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
