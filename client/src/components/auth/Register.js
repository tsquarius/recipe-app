import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { REGISTER_USER } from "../../graphql/mutations";
import styled from 'styled-components';

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
        props.history.push("/recipes");
      }}
      update={(client, { data }) => updateCache(client, data)}
    >
      {register => (
        <div className="main-content-section">
          <h1>Register</h1>
          <Form onSubmit={e => handleSubmit(e, register)}>
            <Input
              value={username}
              onChange={handleUsernameInput}
              placeholder="Username"
            />
            <Input
              value={email}
              onChange={handleEmailInput}
              placeholder="Email"
            />
            <Input
              value={password}
              type="password"
              onChange={handlePasswordInput}
              placeholder="password"
            />
            <Button type="submit">Register</Button>
          </Form>
        </div>
      )}
    </Mutation>
  );
};

export default Register;
