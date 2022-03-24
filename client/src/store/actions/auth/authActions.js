require("dotenv").config();

export const REGISTER_USER_START = "REGISTER_USER_START";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILURE = "REGISTER_USER_FAILURE";

export const LOGIN_USER_START = "LOGIN_USER_START";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";

export const LOGOUT_USER_START = "LOGOUT_USER_START";
export const LOGOUT_USER_SUCCESS = "LOGOUT_USER_SUCCESS";

export const VERIFY_LOGIN_START = "VERIFY_LOGIN_START";
export const VERIFY_LOGIN_SUCCESS = "VERIFY_LOGIN_SUCCESS";

export const CHECK_TOKEN = "CHECK_TOKEN";

const url = "http://localhost:4000/graphql";


/**
 * Registers a new user
 * @param {*} props The initial data for the user
 */
export const registerUser = ({ email, username, password }) => {
  return async (dispatch) => {
    dispatch({ type: REGISTER_USER_START });

    const query = {
      user: {
        email,
        username,
        password,
      },
    };

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
        .then((response) => response.json())
        .then((data) => {
          dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: true,
          });
        })
        .catch((err) => {
          dispatch({
            type: REGISTER_USER_FAILURE,
            payload: "Internal Server Error",
          });
        }),
    });
  };
};

/**
 * Logs in a new user, setting the JWT token in localStorage
 * @param {*} props The email and password for the user
 */
export const loginUser = ({ email, password }) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_USER_START });

    // const query = {
    //   user: {
    //     email,
    //     password,
    //   },
    // };

    const LOGIN_MUTATION = `
    {
      email: ${email},
      password: ${password}
    }
    `

    // console.log("[LOGIN_USER QUERY]", JSON.stringify(query ));

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({query: LOGIN_MUTATION}),
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then((data) => {
        console.log("[LOGIN_USER]", data);
        dispatch({
          type: LOGIN_USER_SUCCESS,
          payload: true,
        });
      })
      .catch((err) => {
        console.log(typeof err.message);
        dispatch({
          type: LOGIN_USER_FAILURE,
          payload: err.message === "400" ? "Email or password is incorrect" : "Internal Server Error",
        });
      });
  };
};

/**
 * Logs out the user, removing JWT from localStorage
 */
export const logoutUser = () => {
  return async (dispatch) => {
    dispatch({ type: LOGOUT_USER_START });

    localStorage.removeItem("jwt");

    dispatch({ type: LOGOUT_USER_SUCCESS, payload: false });
  };
};

/**
 * Verifies that a user is still logged in
 */
export const verifyLogin = () => {
  return async (dispatch) => {
    dispatch({ type: VERIFY_LOGIN_START });
    const token = localStorage.getItem("jwt");
    const jwt = require("jsonwebtoken");

    let expired = true;

    if (token != null) {
      jwt.verify(token, process.env.REACT_APP_JWT_SECRET, (err) => {
        if (err) {
          expired = true;
        } else {
          expired = false;
        }
      });

      if (expired) {
        dispatch({ type: VERIFY_LOGIN_SUCCESS, payload: false });
      } else {
        dispatch({ type: VERIFY_LOGIN_SUCCESS, payload: true });
      }
    }
  };
};
