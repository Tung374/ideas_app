import './App.css';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Register />}>
          
        </Route>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />}></Route>
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />}>
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
