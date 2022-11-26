const express = require("express");
const router = express.Router();
const {
    getAllOrgranizations,
    getById,
    addOrganization,
    updateOrganization,
    deleteOrganization } = require("../controllers/Organizations-controller");

    const auth = require('../Middlewares/auth')

    // router.use('/', checkUserAuth)
    //Public Routes
    
    router.get("/", auth, getAllOrgranizations);
    router.post("/", auth, addOrganization);
    router.get("/:id", auth, getById);
    router.put("/:id", auth, updateOrganization);
    router.delete("/:id", auth, deleteOrganization);

module.exports = router;