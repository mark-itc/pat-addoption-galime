const Joi = require("joi");
const consants = require("../constants");

const validateObjectSchema = (data, schema) => {
  const result = schema.validate(data, { convert: false });
  if (result.error) {
    const errorDetails = result.error.details.map((value) => {
      return {
        error: value.message,
        path: value.path,
      };
    });
    return errorDetails;
  }
  return;
};

module.exports.validateBody = (schema) => {
  return (req, res, next) => {
    let response = { ...consants.defaultServerResonse };
    const error = validateObjectSchema(req.body, schema);
    if (error) {
      response.body = error;
      response.message = consants.requestValidationMessage.BAD_REQUEST;
      return res.status(response.status).send(response);
    }
    return next();
  };
};

module.exports.validateQueryParams = (schema) => {
  return (req, res, next) => {
    let response = { ...consants.defaultServerResonse };
    const error = validateObjectSchema(req.query, schema);
    if (error) {
      response.body = error;
      response.message = consants.requestValidationMessage.BAD_REQUEST;
      return res.status(response.status).send(response);
    }
    return next();
  };
};
