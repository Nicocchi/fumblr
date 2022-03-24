export const verifyToken = (token) => {
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

    
  }

  if (expired) {
    return true;
  } else {
    return false;
  }
};
