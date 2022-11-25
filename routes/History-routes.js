const express = require("express");
const router = express.Router();
const {
    getAllHistory,
    getById,
    addHistory } = require("../controllers/History-controller");

router.get("/", getAllHistory);
router.post("/", addHistory);
router.get("/:id", getById);

module.exports = router;