import React from "react";
import { Route, Routes } from "react-router";
import { nanoid } from "nanoid";
// import { connect } from "react-redux";

import Home from "./pages/Home";
import Landing from "./pages/Landing";

function RouterSwitch(props) {
  return (
    <Routes>
      <Route key={nanoid()} exact path="/" element={<Home />} />
    </Routes>
  );
}

export default RouterSwitch;

// function mapStateToProps(state) {
//   return {};
// }

// export default connect(mapStateToProps, {})(Routes);
