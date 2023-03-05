const userService = require("../service/userService");
const consants = require("../constants");

module.exports.singup = async (req, res) => {
  let response = { ...consants.defaultServerResonse };
  try {
    const responseFromService = await userService.singup(req.body);
    console.log("req.body ====>", req.body);

    response.status = 200;
    response.message = consants.userMessage.SINGUP_SUCCESS;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong! controller: singup", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.login = async (req, res) => {
  let response = { ...consants.defaultServerResonse };
  try {
    const responseFromService = await userService.login(req.body);
    console.log("req.body===>>", req.body);
    response.status = 200;
    response.message = consants.userMessage.LOGIN_SUCCESS;
    console.log("responseFromService ==>", responseFromService);

    response.body = {
      token: responseFromService.token,
      isAdmin: responseFromService.decoded.isAdmin,
      userProfile: {
        email: responseFromService.user._doc.email,
        firstName: responseFromService.user._doc.firstName,
        lastName: responseFromService.user._doc.lastName,
        pets: responseFromService.user._doc.pets,
        savedPets: responseFromService.user._doc.savedPets,
        id: responseFromService.decoded.id,
      },
    };
    console.log("response.body.userProfile", response.body.userProfile);
  } catch (error) {
    console.log("Something went wrong! controller: login", error);
    response.message = error.message;
  }
  console.log("res =====>", res);

  return res.status(response.status).send(response);
};

module.exports.getUser = async (req, res) => {
  let response = { ...consants.defaultServerResonse };
  try {
    const responseFromService = await userService.getUser(req.body);
    console.log("req.body===>>", req.body);
    response.status = 200;
    response.message = consants.userMessage.USER_FETCHED;
    console.log("responseFromService ==>", responseFromService);

    response.body = {
      token: responseFromService.token,
      isAdmin: responseFromService.decoded.isAdmin,
    };
  } catch (error) {
    console.log("Something went wrong! controller: getUser", error);
    response.message = error.message;
  }
  console.log("res =====>", res);

  return res.status(response.status).send(response);
};

module.exports.getUserByMail = async (req, res) => {
  let response = { ...consants.defaultServerResonse };
  try {
    console.log("req.body of getUserByMail===>>", req.body);
    const responseFromService = await userService.getUserByMail(req.body);
    response.status = 200;
    response.message = consants.userMessage.USER_FETCHED;
    console.log("responseFromService ==>", responseFromService);
    console.log("req.body.email", req.body.emailOfSubmit);
    console.log("responseFromService.email", responseFromService.email);

    response.body = {
      ...responseFromService,
      isTheCurrentUser: responseFromService.email === req.body.emailOfSubmit,
    };
  } catch (error) {
    console.log("Something went wrong! controller: getUserByMail", error);
    response.message = error.message;
  }
  console.log("res =====>", res);

  return res.status(response.status).send(response);
};

module.exports.getUser = async (req, res) => {
  let response = { ...consants.defaultServerResonse };

  try {
    const responseFromService = await userService.getUser(req.params);
    console.log("responseFromService", responseFromService);

    response.status = 200;
    response.message = consants.userMessage.USER_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong! controller: getUser", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.updateuser = async (req, res) => {
  let response = { ...consants.defaultServerResonse };
  try {
    const responseFromService = await userService.updateuser({
      id: req.params.id,
      updateInfo: req.body,
    });
    response.status = 200;
    response.message = consants.userMessage.USER_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong! controller: updateuser", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.getAllUsers = async (req, res) => {
  let response = { ...consants.defaultServerResonse };
  try {
    const responseFromService = await userService.getAllUsers(req.query);
    response.status = 200;
    response.message = consants.userMessage.USER_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong! controller: getAllUsers", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};
module.exports.getAllUser = async (req, res) => {
  let response = { ...consants.defaultServerResonse };
  try {
    const responseFromService = await userService.getAllUsers(req.query);
    response.status = 200;
    response.message = consants.userMessage.USER_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong! controller: getAllUser", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};
