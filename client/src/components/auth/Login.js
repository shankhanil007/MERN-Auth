import React, { useState, useContext, useEffect } from "react";
import GoogleLogin from "react-google-login";
import AuthContext from "../../context/auth/authContext";

const Login = (props) => {
  const authContext = useContext(AuthContext);
  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (error === "Invalid Credentials") {
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
    } else {
      login({
        email,
        password,
      });
    }
  };

  const onLoginSuccess = (res) => {
    login({
      email: res.profileObj.email,
      password: "GooglePassword",
    });
  };

  const onLoginFailure = (res) => {
    console.log("Login Failed:", res);
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="btn btn-primary btn-block"
        />
      </form>
      <GoogleLogin
        clientId="17349852299-7ed5tgmaa6dl40p6qmoovg6pg4ar602f.apps.googleusercontent.com"
        buttonText="Sign Up with Google"
        onSuccess={onLoginSuccess}
        onFailure={onLoginFailure}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default Login;
