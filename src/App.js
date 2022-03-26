
import './App.css';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />}/>
        <Route path="/home" element={<Home/>}/>
        {/* <Route path="/register">
          <Register />
        </Route>
        <Route path="/profile/:username">
          <Profile />
        </Route> */}
      </Routes>
    </Router>
  );
}

export default App;
