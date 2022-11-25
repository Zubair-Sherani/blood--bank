const express = require("express");
const router = express.Router();
const {
    getAllRequests,
    getById,
    addRequest,
    updateRequest,
    deleteRequest } = require("../controllers/Requests-controller");

router.get("/", getAllRequests);
router.post("/", addRequest);
router.get("/:id", getById);
router.put("/:id", updateRequest);
router.delete("/:id", deleteRequest);

module.exports = router;