const express = require("express");
const router = express.Router();
const {
    getAllAdmins,
    getById,
    addAdmin,
    updateAdmin,
    deleteAdmin } = require("../controllers/Admins-controller");

router.get("/", getAllAdmins);
router.post("/", addAdmin);
router.get("/:id", getById);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);

module.exports = router;