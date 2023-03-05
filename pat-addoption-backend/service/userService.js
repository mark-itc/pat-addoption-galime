const constants = require("../constants");
const User = require("../database/models/usersModel");
const { formatMongoDate, checkObjectId } = require("../helper/dbHelper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.singup = async ({
  email,
  firstName,
  lastName,
  password,
  isAdmin,
}) => {
  try {
    const user = await User.findOne({ email });
    if (user) {
      throw new Error(constants.userMessage.DUPLICATE_EMAIL);
    }
    password = await bcrypt.hash(password, 10);

    const newUser = new User({ email, firstName, lastName, password, isAdmin });

    let result = await newUser.save();
    return formatMongoDate(result);
  } catch (error) {
    console.log("somthing went wrong! servise: singup", error);
    throw new Error(error);
  }
};

module.exports.login = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error(constants.userMessage.USER_NOT_FOUND);
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error(constants.userMessage.INVALID_PASSWORD);
    }
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY || "my-secret-key",
      { expiresIn: "1d" }
    );
    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY || "my-secret-key"
    );
    return { token, decoded, user };
  } catch (error) {
    console.log("somthing went wrong! servise: login", error);
    throw new Error(error);
  }
};

module.exports.getUserByMail = async ({ email }) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error(constants.userMessage.USER_NOT_FOUND);
    }
    return formatMongoDate(user);
  } catch (error) {
    console.log("somthing went wrong! servise: getUserByMail", error);
    throw new Error(error);
  }
};

module.exports.getUser = async ({ id }) => {
  try {
    checkObjectId(id);
    let user = await User.findById(id);
    if (!user) {
      throw new Error(consants.userMessage.USER_NOT_FOUND);
    }
    return formatMongoDate(user);
  } catch (error) {
    console.log("somthing went wrong! servise: getUser", error);
    throw new Error(error);
  }
};

module.exports.updateuser = async ({ id, updateInfo }) => {
  try {
    checkObjectId(id);
    console.log("updateInfo======>", updateInfo);

    let user = await User.findOne({ _id: id });
    if (!(user.email === updateInfo.email)) {
      user = await User.findOne({ email });
      if (user) {
        throw new Error(constants.userMessage.DUPLICATE_EMAIL);
      }
    } else {
      user = await User.findOneAndUpdate(
        { _id: id },
        { updateInfo },
        {
          new: true,
        }
      );
      console.log("user AFTER CHANGE!!!====>", user);

      if (!user) {
        throw new Error(consants.userMessage.USER_NOT_FOUND);
      }
    }
    return formatMongoDate(user);
  } catch (error) {
    console.log("somthing went wrong! servise: updateuser", error);
    throw new Error(error);
  }
};

module.exports.getAllUsers = async () => {
  try {
    let users = await User.find({});
    return formatMongoDate(users);
  } catch (error) {
    console.log("somthing went wrong! servise: getAllUsers", error);
    throw new Error(error);
  }
};

module.exports.getAllUsers = async () => {
  try {
    let user = await User.find({});
    return formatMongoDate(user);
  } catch (error) {
    console.log("somthing went wrong! servise: getAllUsers", error);
    throw new Error(error);
  }
};
