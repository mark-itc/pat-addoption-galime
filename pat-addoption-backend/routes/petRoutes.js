const express = require("express");

const petComtroller = require("../controllers/petController");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const petSchema = require("../apiSchema/petSchema");
const tokenValidation = require("../middleware/tokenValidation");

const router = express.Router();

router.get("/", petComtroller.getAllPets);

router.post("/", tokenValidation.validateAdminToken, petComtroller.postPet);

router.get("/:id", petComtroller.getPetById);

router.get("/user/:id", petComtroller.getPetByUserId);

router.put(
  "/:id",
  tokenValidation.validateAdminToken,
  joiSchemaValidation.validateBody(petSchema.updatePetSchema),
  petComtroller.updatePet
);

router.post(
  "/:id/adopt",
  tokenValidation.validateToken,
  joiSchemaValidation.validateBody(petSchema.updatePetSchema),
  petComtroller.updatePetStatus
);

router.post(
  "/:id/foster",
  tokenValidation.validateToken,
  joiSchemaValidation.validateBody(petSchema.updatePetSchema),
  petComtroller.updatePetStatus
);

router.post(
  "/:id/return",
  tokenValidation.validateToken,
  joiSchemaValidation.validateBody(petSchema.updatePetSchema),
  petComtroller.returnPet
);

router.post("/:id/save", tokenValidation.validateToken, petComtroller.savePet);
router.delete(
  "/:id/save",
  tokenValidation.validateToken,
  petComtroller.deleteSavedPet
);

router.delete("/:id", petComtroller.deletePet);

module.exports = router;
