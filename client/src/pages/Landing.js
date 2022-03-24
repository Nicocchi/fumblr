import React, { useState } from "react";
import { Text, Input, Spacer, Button } from "@nextui-org/react";
import { Send } from "react-iconly";

import { connect } from "react-redux";
import { registerUser, loginUser } from "../store/actions/auth";

import { useLazyQuery } from "@apollo/client";
import { LOGIN_USER } from "../graphql/Queries";

function Landing(props) {
  const [account, setAccount] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { error, loading, data: loginData }] = useLazyQuery(LOGIN_USER);

  if (error) {
    console.log("ERROR", error);
  }
  if (loading) {
    console.log("LOADING GQL");
  }
  if (loginData) {
    console.log("USER DATA", loginData);
    localStorage.setItem('token', loginData.login.token)
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Text h1>See what's fumblring</Text>
        {account ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Spacer y={1.6} />
            <Input
              labelPlaceholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Spacer y={1.6} />
            <Input.Password
              labelPlaceholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {props.error ? <Text color="error">{props.error}</Text> : null}
            <Spacer y={1.6} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div></div>
              <Button
                icon={<Send fill="currentColor" />}
                color="secondary"
                onClick={() =>
                  login({
                    variables: {
                      email: email,
                      password: password,
                    },
                  })
                }
              ></Button>
            </div>
            <Spacer y={2.6} />
            <Text h2>Don't have an account?</Text>
            <Spacer y={1.6} />
            <Button color="primary" onClick={() => setAccount(false)}>
              Register
            </Button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Spacer y={1.6} />
            <Input labelPlaceholder="Email" />
            <Spacer y={1.6} />
            <Input labelPlaceholder="Username" />
            <Spacer y={1.6} />
            <Input.Password labelPlaceholder="Password" initialValue="" />
            <Spacer y={1.6} />
            <Input.Password
              labelPlaceholder="Confirm Password"
              initialValue=""
            />
            <Spacer y={1.6} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div></div>
              <Button
                icon={<Send fill="currentColor" />}
                color="secondary"
              ></Button>
            </div>
            <Spacer y={2.6} />
            <Text h2>Already have an account?</Text>
            <Spacer y={1.6} />
            <Button color="primary" onClick={() => setAccount(true)}>
              Login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.authReducer.isLoggedIn,
    tokenExpired: state.authReducer.tokenExpired,
    error: state.authReducer.error,
  };
}

export default connect(mapStateToProps, { registerUser, loginUser })(Landing);
