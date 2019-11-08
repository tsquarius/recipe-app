import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { REGISTER_USER } from "../../graphql/mutations";

const Register = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleEmailInput = e => {
    setEmail(e.target.value);
  };

  const handlePasswordInput = e => {
    setPassword(e.target.value);
  };

  const handleUsernameInput = e => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e, register) => {
    e.preventDefault();
    register({
      variables: {
        username,
        email,
        password
      }
    });
  };

  const updateCache = (client, data) => {
    client.writeData({
      data: { isLoggedIn: data.register.loggedIn }
    });
  };

  return (
    <Mutation
      mutation={REGISTER_USER}
      onCompleted={data => {
        const { token } = data.register;
        localStorage.setItem("auth-token", token);
        props.history.push("/");
      }}
      update={(client, { data }) => updateCache(client, data)}
    >
      {register => (
        <div className="main-content-row">
          <h1>Register</h1>
          <form onSubmit={e => handleSubmit(e, register)}>
            <input
              value={username}
              onChange={handleUsernameInput}
              placeholder="Username"
            />
            <input
              value={email}
              onChange={handleEmailInput}
              placeholder="Email"
            />
            <input
              value={password}
              type="password"
              onChange={handlePasswordInput}
              placeholder="password"
            />
            <button type="submit">Register</button>
          </form>
        </div>
      )}
    </Mutation>
  );
};

export default Register;
