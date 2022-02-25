import {Routes, Route, Link} from "react-router-dom";
import './App.css';
import Login from "./components/routes/Login";
import SignUp from "./components/routes/Signup";
import Home from "./components/routes/Home";

function App() {
  return (
    <div className="App">
      <h1>This is the app</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
