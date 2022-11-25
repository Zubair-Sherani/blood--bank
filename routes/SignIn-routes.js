const express = require("express");
const router = express.Router();
const Individuals = require('../models/Individual')
const Organizations = require('../models/Organization')
const Admins = require('../models/Admin')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require("dotenv").config();



router.post('/', async (req, res) => {
  try {
    const { email, password, type } = req.body
    if (email && password) {
      if (type === "individual") {
        const user = await Individuals.findOne({ email: email })
        if (user != null) {
          const isMatch = await bcrypt.compare(password, user.password)
          if ((user.email === email) && isMatch) {
            // Generate JWT Token
            const token = jwt.sign({ userID: user._id, type: type }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
            res.json({ "status": "success", "message": "Login Success", "token": token })
          } else {
            res.send({ "status": "failed", "message": "Email or Password is not Valid" })
          }
        } else {
          res.send({ "status": "failed", "message": "You are not a Registered User" })
        }
      }
      else if (type === "organization"){
        const user = await Organizations.findOne({ email: email })
        if (user != null) {
          const isMatch = await bcrypt.compare(password, user.password)
          if ((user.email === email) && isMatch) {
            // Generate JWT Token
            const token = jwt.sign({ userID: user._id, type: type }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
            res.json({ "status": "success", "message": "Login Success", "token": token })
          } else {
            res.send({ "status": "failed", "message": "Email or Password is not Valid" })
          }
        } else {
          res.send({ "status": "failed", "message": "Not a registered Organization" })
        }
      }
      else{
        const user = await Admins.findOne({ email: email })
        if (user != null) {
          const isMatch = await bcrypt.compare(password, user.password)
          if ((user.email === email) && isMatch) {
            // Generate JWT Token
            const token = jwt.sign({ userID: user._id, type: type }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
            res.json({ "status": "success", "message": "Login Success", "token": token })
          } else {
            res.send({ "status": "failed", "message": "Email or Password is not Valid" })
          }
        } else {
          res.send({ "status": "failed", "message": "Not a registered Admin" })
        }
      }
    } else {
      res.send({ "status": "failed", "message": "All Fields are Required" })
    }
  } catch (error) {
    console.log(error)
    res.send({ "status": "failed", "message": "Unable to Login" })
  }
})

module.exports = router