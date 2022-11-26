const express = require("express");
const router = express.Router();
const {
    getAllHistory,
    getById,
    addHistory } = require("../controllers/History-controller");
const auth = require('../Middlewares/auth')

router.get("/", auth, getAllHistory);
router.post("/", auth, addHistory);
router.get("/:id", auth, getById);

module.exports = router;