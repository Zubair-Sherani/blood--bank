const express = require("express");
const router = express.Router();
const {
    getAllOrgranizations,
    getById,
    addOrganization,
    updateOrganization,
    deleteOrganization } = require("../controllers/Organizations-controller");

router.get("/", getAllOrgranizations);
router.post("/", addOrganization);
router.get("/:id", getById);
router.put("/:id", updateOrganization);
router.delete("/:id", deleteOrganization);

module.exports = router;