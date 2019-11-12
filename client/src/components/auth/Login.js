import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { LOGIN_USER } from "../../graphql/mutations";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  @media (min-width: 700px) {
    width: 50%;
    margin: auto;
  }
`;

const Input = styled.input`
  margin: auto;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 10px;
  border: 1px solid lightgray;
  width: 80%;
`;

const Button = styled.button`
  width: 40%;
  margin: auto;
`;

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
      data: { isLoggedIn: data.login.loggedIn }
    });
  };

  return (
    <Mutation
      mutation={LOGIN_USER}
      onCompleted={data => {
        const { token } = data.login;
        localStorage.setItem("auth-token", token);
        props.history.push("/recipes");
      }}
      update={(client, { data }) => {
        updateCache(client, data);
      }}
    >
      {loginUser => (
        <div className="main-content-section">
          <h1>Log In</h1>
          <Form onSubmit={e => handleSubmit(e, loginUser)}>
            <Input
              value={email}
              onChange={handleEmailInput}
              placeholder="email"
            />
            <Input
              value={password}
              onChange={handlePasswordInput}
              placeholder="password"
              type="password"
            />
            <Button type="submit">Login</Button>
          </Form>
        </div>
      )}
    </Mutation>
  );
};

export default Login;
