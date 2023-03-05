const consants = require("../constants");
const jwt = require("jsonwebtoken");

module.exports.validateToken = (req, res, next) => {
  console.log("req from token:", req);
  console.log("res from token:", res);
  console.log("next from token:", next);
  res.locals.id = "123";

  let response = { ...consants.defaultServerResonse };
  try {
    if (!req.headers.authorization) {
      throw new Error(consants.requestValidationMessage.TOKEN_MISSING);
    }
    const token = req.headers.authorization.split("Bearer=")[1].trim();
    console.log("req.headers.authorization ===>", req.headers.authorization);

    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY || "my-secret-key"
    );
    console.log("decoded", decoded);
    res.locals.UserId = decoded.id;
    console.log("res.id from token:", res.locals.UserId);
    return next();
  } catch (error) {
    console.log("Error", error);
    response.message = error.message;
    response.status = 401;
  }
  return res.status(response.status).send(response);
};

module.exports.validateAdminToken = (req, res, next) => {
  let response = { ...consants.defaultServerResonse };
  try {
    if (!req.headers.authorization) {
      throw new Error(consants.defaultServerResonse.TOKEN_MISSING);
    }
    console.log("req.headers.authorization ===>", req.headers.authorization);

    const token = req.headers.authorization.split("Bearer=")[1].trim();
    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY || "my-secret-key"
    );
    console.log("decoded", decoded);
    if (!decoded.isAdmin) {
      throw new Error(consants.requestValidationMessage.UNAUTHORIZED);
    }
    return next();
  } catch (error) {
    console.log("Error", error);
    response.message = error.message;
    response.status = 401;
  }
  return res.status(response.status).send(response);
};
