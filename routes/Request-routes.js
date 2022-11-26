const express = require("express");
const router = express.Router();
const {
    getAllRequests,
    getById,
    addRequest,
    updateRequest,
    deleteRequest,
    getIndividualRequests,
    deleteIndividualRequests} = require("../controllers/Requests-controller");

const auth = require('../Middlewares/auth')


router.get("/", auth, getAllRequests);
router.post("/", auth, addRequest);
router.get("/:id", auth, getById);
router.put("/:id", auth, updateRequest);
router.delete("/:id", auth, deleteRequest);

module.exports = router;