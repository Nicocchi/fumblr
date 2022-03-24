import React from "react";
import { Route, Routes } from "react-router";
import { nanoid } from "nanoid";
import { connect } from "react-redux";

import Home from "./pages/Home";
import Landing from "./pages/Landing";
import { verifyToken } from "./utils/utils";

function RouterSwitch(props) {
  const token = localStorage.getItem('token');
  const isExpired = verifyToken(token);
  return (
    <Routes>
      <Route key={nanoid()} exact path="/" element={token && !isExpired ? <Home /> : <Landing />} />
    </Routes>
  );
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.authReducer.isLoggedIn,
    tokenExpired: state.authReducer.tokenExpired,
  };
}

export default connect(mapStateToProps, {})(RouterSwitch);
