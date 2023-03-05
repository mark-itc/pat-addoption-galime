const petService = require("../service/petService");
const consants = require("../constants");
const jwt = require("jsonwebtoken");
const tokenValidation = require("../middleware/tokenValidation");

module.exports.postPet = async (req, res) => {
  let response = { ...consants.defaultServerResonse };
  const image = req.file;
  try {
    const responseFromService = await petService.createPet(req.body, image);
    response.status = 200;
    response.message = consants.petMessage.PET_CREATED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong! controller: postPet", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.getAllPets = async (req, res) => {
  let response = { ...consants.defaultServerResonse };
  try {
    const responseFromService = await petService.getAllPets(req.query);
    response.status = 200;
    response.message = consants.petMessage.PETS_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong! controller: getAllPets", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.getPetById = async (req, res) => {
  let response = { ...consants.defaultServerResonse };
  try {
    const responseFromService = await petService.getPetById(req.params);
    response.status = 200;
    response.message = consants.petMessage.PETS_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong! controller: getPetById", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.getPetByParam = async (req, res) => {
  let response = { ...consants.defaultServerResonse };
  try {
    console.log("req.query =====>", req.query);

    const responseFromService = await petService.getPetByParam(req.query);
    response.status = 200;
    response.message = consants.petMessage.PETS_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong! controller: getPetByParam", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.updatePet = async (req, res) => {
  let response = { ...consants.defaultServerResonse };
  try {
    const responseFromService = await petService.updatePet({
      id: req.params.id,
      updateInfo: req.body,
    });
    response.status = 200;
    response.message = consants.petMessage.PET_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong! controller: updatePet", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.updatePetStatus = async (req, res) => {
  let response = { ...consants.defaultServerResonse };
  try {
    const responseFromService = await petService.updatePetStatus({
      id: req.params.id,
      updateInfo: req.body,
      userId: res.locals.UserId,
    });
    response.status = 200;
    response.message = consants.petMessage.PET_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong! controller: updatePetStatus", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.deletePet = async (req, res) => {
  let response = { ...consants.defaultServerResonse };
  try {
    const responseFromService = await petService.deletePet(req.params);
    response.status = 200;
    response.message = consants.petMessage.PET_DELETED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong! controller: deletePet", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.returnPet = async (req, res) => {
  let response = { ...consants.defaultServerResonse };
  try {
    const responseFromService = await petService.returnPet({
      id: req.params.id,
      userId: res.locals.UserId,
    });
    response.status = 200;
    response.message = consants.petMessage.PET_RETURNED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong! controller: returnPet", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.savePet = async (req, res) => {
  let response = { ...consants.defaultServerResonse };
  try {
    const responseFromService = await petService.savePet({
      id: req.params.id,
      userId: res.locals.UserId,
    });
    response.status = 200;
    response.message = consants.petMessage.PET_SAVED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong! controller: savePet", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.deleteSavedPet = async (req, res) => {
  let response = { ...consants.defaultServerResonse };
  try {
    const responseFromService = await petService.deleteSavedPet({
      id: req.params.id,
      userId: res.locals.UserId,
    });
    response.status = 200;
    response.message = consants.petMessage.SAVED_PET_DELETED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong! controller: deleteSavedPet", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.getPetByUserId = async (req, res) => {
  let response = { ...consants.defaultServerResonse };
  try {
    console.log(" req.params getPetByUserId=====>", req.params);

    const responseFromService = await petService.getPetByUserId(req.params);
    response.status = 200;
    response.message = consants.petMessage.PETS_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong! controller: getPetByUserId", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};
