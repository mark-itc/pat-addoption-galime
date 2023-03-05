const Pet = require("../database/models/petModel");
const User = require("../database/models/usersModel");
const { formatMongoDate, checkObjectId } = require("../helper/dbHelper");
const consants = require("../constants");
const mongoose = require("mongoose");

module.exports.createPet = async (serviceData, image) => {
  try {
    let pet = new Pet({
      ...serviceData,
      image,
    });
    let result = await pet.save();
    return formatMongoDate(result);
  } catch (error) {
    console.log("somthing went wrong! servise: createPer", error);
    throw new Error(error);
  }
};

module.exports.getAllPets = async ({ skip = 0, limit = 10 }) => {
  try {
    let pets = await Pet.find({}).skip(parseInt(skip)).limit(parseInt(limit));
    return formatMongoDate(pets);
  } catch (error) {
    console.log("somthing went wrong! servise: getAllPets", error);
    throw new Error(error);
  }
};

module.exports.getPetById = async ({ id }) => {
  try {
    checkObjectId(id);
    let pet = await Pet.findById(id);
    if (!pet) {
      throw new Error(consants.petMessage.PET_NOT_FOUND);
    }
    return formatMongoDate(pet);
  } catch (error) {
    console.log("somthing went wrong! servise: getPetById", error);
    throw new Error(error);
  }
};

module.exports.updatePet = async ({ id, updateInfo }) => {
  try {
    checkObjectId(id);
    let pet = await Pet.findOneAndUpdate({ _id: id }, updateInfo, {
      new: true,
    });
    if (!pet) {
      throw new Error(consants.petMessage.PET_NOT_FOUND);
    }
    return formatMongoDate(pet);
  } catch (error) {
    console.log("somthing went wrong! servise: updatePet", error);
    throw new Error(error);
  }
};

module.exports.updatePetStatus = async ({ id, updateInfo, userId }) => {
  try {
    checkObjectId(id);
    checkObjectId(userId);
    let pet = await Pet.findOneAndUpdate(
      { _id: id },
      { status: updateInfo.status, userId: userId },
      {
        new: true,
      }
    );
    if (!pet) {
      throw new Error(consants.petMessage.PET_NOT_FOUND);
    }
    const user = User.findByIdAndUpdate(
      { _id: userId },
      { $push: { pets: id } },
      { new: true },
      function (err, model) {
        console.log(err);
      }
    );

    return formatMongoDate(pet);
  } catch (error) {
    console.log("somthing went wrong! servise: updatePetStatus", error);
    throw new Error(error);
  }
};

module.exports.returnPet = async ({ id, userId }) => {
  try {
    checkObjectId(id);
    checkObjectId(userId);
    let pet = await Pet.findOne({ id });
    if (!pet) {
      throw new Error(consants.petMessage.PET_NOT_FOUND);
    }
    const user = User.findByIdAndUpdate(
      { _id: userId },
      { $pull: { pets: id } },
      { new: true },
      function (err, model) {
        console.log(err);
      }
    );

    return formatMongoDate(pet);
  } catch (error) {
    console.log("somthing went wrong! servise: deleteSaveDPet", error);
    throw new Error(error);
  }
};

module.exports.deleteSavedPet = async ({ id, userId }) => {
  try {
    checkObjectId(id);
    checkObjectId(userId);
    let pet = await Pet.findOne({ id });
    if (!pet) {
      throw new Error(consants.petMessage.PET_NOT_FOUND);
    }
    const user = User.findByIdAndUpdate(
      { _id: userId },
      { $pull: { savedPets: id } },
      { new: true },
      function (err, model) {
        console.log(err);
      }
    );

    return formatMongoDate(pet);
  } catch (error) {
    console.log("somthing went wrong! servise: deleteSaveDPet", error);
    throw new Error(error);
  }
};

module.exports.savePet = async ({ id, userId }) => {
  try {
    checkObjectId(id);
    checkObjectId(userId);
    let pet = await Pet.findOne({ id });
    if (!pet) {
      throw new Error(consants.petMessage.PET_NOT_FOUND);
    }
    const user = User.findByIdAndUpdate(
      { _id: userId },
      { $push: { savedPets: id } },
      { new: true },
      function (err, model) {
        console.log(err);
      }
    );

    return formatMongoDate(pet);
  } catch (error) {
    console.log("somthing went wrong! servise: savePet", error);
    throw new Error(error);
  }
};

module.exports.deleteSavedPet = async ({ id, userId }) => {
  try {
    checkObjectId(id);
    checkObjectId(userId);
    let pet = await Pet.findOne({ id });
    if (!pet) {
      throw new Error(consants.petMessage.PET_NOT_FOUND);
    }
    const user = User.findByIdAndUpdate(
      { _id: userId },
      { $pull: { savedPets: id } },
      { new: true },
      function (err, model) {
        console.log(err);
      }
    );

    return formatMongoDate(pet);
  } catch (error) {
    console.log("somthing went wrong! servise: deleteSaveDPet", error);
    throw new Error(error);
  }
};

module.exports.getPetByUserId = async ({ id }) => {
  try {
    checkObjectId(id);
    let user = await User.findById(id);
    if (!user) {
      throw new Error(consants.userMessage.USER_NOT_FOUND);
    }
    const petId = user.pets.toString();

    let pet = await Pet.findById(petId);
    if (!pet) {
      throw new Error(consants.petMessage.PET_NOT_FOUND);
    }
    return formatMongoDate(pet);
  } catch (error) {
    console.log("somthing went wrong! servise: getPetByUserId", error);
    throw new Error(error);
  }
};
