const express = require("express");
const router = express.Router();
const {
    getAllIndividuals,
    getById,
    addIndividual,
    updateIndividual,
    deleteIndividual,
    getIndividualRequests,
    deleteIndividualRequests} = require("../controllers/Individuals-controller");

const auth = require('../Middlewares/auth')


//accessible by only admins

router.get("/", auth, getAllIndividuals);
router.post("/", auth, addIndividual);
router.get("/:id", auth, getById);
router.put("/:id", auth, updateIndividual);
router.delete("/:id", auth, deleteIndividual);

module.exports = router;