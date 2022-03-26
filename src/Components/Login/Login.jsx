import './Login.css'
import { useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate();
  const handleLogin = (e) => {
    navigate("/home");
  }
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginRight">
          <form className="loginBox" onSubmit={() =>handleLogin()}>
            <div className="grid-container">
              <label className="inputLabel item1">Email:</label>
              <input
                placeholder="putindesnat@gmail.com"
                required
                type="email"
                className="loginInput item2"
              />
            </div>
            <div className="grid-container">
              <label className="inputLabel item1">Password:</label>
              <input
                placeholder="Password"
                required
                type="password"
                minLength="6"
                className="loginInput item2"
              />
            </div>
            <b className="forgotPassword">Forgot your password?</b>
            <button className="loginButton" type="submit">Login</button>
          </form>
          <button className="loginButton" onClick={() =>handleLogin()}>Login</button>
        </div>
      </div>
    </div>
  )
}
export default Login