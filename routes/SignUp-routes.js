const express = require("express");
const router = express.Router();
const Individuals = require('../models/Individual')
const { addIndividual } = require("../controllers/Individuals-controller");


router.post('/', addIndividual);
