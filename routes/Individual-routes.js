const express = require("express");
const router = express.Router();
const {
    getAllIndividuals,
    getById,
    addIndividual,
    updateIndividual,
    deleteIndividual } = require("../controllers/Individuals-controller");

const checkUserAuth = require('../Middlewares/auth-individual')

// router.use('/', checkUserAuth)
//Public Routes

router.get("/", checkUserAuth, getAllIndividuals);
router.post("/", addIndividual);
router.get("/:id", getById);
router.put("/:id", updateIndividual);
router.delete("/:id", deleteIndividual);

//Protected Routes

module.exports = router;