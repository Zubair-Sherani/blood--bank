const express = require("express");
const router = express.Router();
const {
    getAllAdmins,
    getById,
    addAdmin,
    updateAdmin,
    deleteAdmin } = require("../controllers/Admins-controller");

const auth = require('../Middlewares/auth')

router.get("/", auth, getAllAdmins);
router.post("/", auth, addAdmin);
router.get("/:id", auth, getById);
router.put("/:id", auth, updateAdmin);
router.delete("/:id", auth, deleteAdmin);

module.exports = router;