import React from "react";
import keys from "../../config/keys";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { Mutation } from "react-apollo";
import { FACEBOOK_AUTH } from "../../graphql/mutations";
import { withRouter } from "react-router-dom";

const fbAuth = props => {
  const responseFacebook = (response, facebookAuth) => {
    const { email, name, id } = response;
    facebookAuth({
      variables: {
        facebookId: id,
        email,
        username: name
      }
    });
  };

  const updateCache = (client, data) => {
    client.writeData({
      data: { isLoggedIn: data.facebookAuth.loggedIn }
    });
  };

  return (
    <Mutation
      mutation={FACEBOOK_AUTH}
      onCompleted={data => {
        const { token } = data.facebookAuth;
        localStorage.setItem("auth-token", token);
        props.history.push("/");
      }}
      update={(client, { data }) => {
        updateCache(client, data);
      }}
    >
      {facebookAuth => (
        <FacebookLogin
          appId={keys.facebookClient}
          autoLoad={false}
          fields="id,name,email"
          render={renderProps => (
            <button onClick={renderProps.onClick}>Login with Facebook</button>
          )}
          callback={response => responseFacebook(response, facebookAuth)}
          icon="fa-facebook"
        />
      )}
    </Mutation>
  );
};

export default withRouter(fbAuth);
