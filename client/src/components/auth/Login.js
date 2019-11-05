import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { LOGIN_USER } from "../../graphql/mutations";

const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailInput = e => {
    setEmail(e.target.value);
  };

  const handlePasswordInput = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e, loginUser) => {
    e.preventDefault();
    loginUser({
      variables: {
        email,
        password
      }
    });
  };

  const updateCache = (client, data) => {
    client.writeData({
      data: { isLoggedIn: data.login.loggedIn}
    });
  };

  return (
    <Mutation
      mutation={LOGIN_USER}
      onCompleted={data => {
        const { token } = data.login;
        localStorage.setItem("auth-token", token);
        props.history.push("/");
      }}
      update={(client, {data}) => {
        updateCache(client, data);
      }}
    >
      {loginUser => (
        <div>
          <h1>Log In</h1>
          <form onSubmit={e => handleSubmit(e, loginUser)}>
            <input
              value={email}
              onChange={handleEmailInput}
              placeholder="email"
            />
            <input
              value={password}
              onChange={handlePasswordInput}
              placeholder="password"
              type="password"
            />
            <button type="submit">Login</button>
          </form>
        </div>
      )}
    </Mutation>
  );
};

export default Login;
