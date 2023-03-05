module.exports = {
  defaultServerResonse: {
    status: 400,
    message: "",
    body: {},
  },
  petMessage: {
    PET_CREATED: "Pet Creates Successfuly!",
    PETS_FETCHED: "Pets Fetched Successfuly!",
    PET_NOT_FOUND: "Pet Not Found",
    PET_UPDATED: "Pet Updated Successfuly!",
    PET_DELETED: "Pet Deleted Successfuly!",
    PET_RETURNED: "Pet Deleted Successfuly from User!",
    PET_SAVED: "Pet Saved Successfuly!",
    SAVED_PET_DELETED: "Saved Pet Deleted Successfuly!",
  },
  userMessage: {
    SINGUP_SUCCESS: "Singup Success",
    DUPLICATE_EMAIL: "User allready exist with given email",
    LOGIN_SUCCESS: "Login Success",
    USER_NOT_FOUND: "User Not Found",
    INVALID_PASSWORD: "Incorrect password",
    USER_FETCHED: "User Fetched Successfuly!",
    USER_UPDATED: "User Updated Successfuly!",
  },
  requestValidationMessage: {
    BAD_REQUEST: "Invalid fields",
    TOKEN_MISSING: "Token missing from header",
    UNAUTHORIZED: "Unauthorized",
  },
  databaseMessage: {
    INVALID_ID: "Invalid id",
  },
};
