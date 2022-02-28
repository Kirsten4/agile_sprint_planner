import {Routes, Route, Link} from "react-router-dom";
import './App.css';
import Login from "./components/routes/Login";
import SignUp from "./components/routes/Signup";
import Home from "./components/routes/Home";
import UsersService from "./services/UsersService";
import {useState} from "react"

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  
  const fetchCurrentUser = (user) => {
    UsersService.getUserByUsername(user.username)
    .then(currentUser => setCurrentUser(currentUser))
    console.log(currentUser);
  }

  return (
    <div className="App">
      <h1>This is the app</h1>
      {/* <h2>The current user is: {currentUser.name}</h2> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login fetchCurrentUser={fetchCurrentUser}/>} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
