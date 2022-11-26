const jwt = require('jsonwebtoken')
require("dotenv").config();
const Individuals = require('../models/Individual')
const Organizations = require('../models/Organization')
const Admins = require('../models/Admin')


var checkIndividualAuth = async (req, res, next) => {
  let token
  const { authorization } = req.headers
  if (authorization && authorization.startsWith('Bearer')) {
    try {
      // Get Token from header
      token = authorization.split(' ')[1]
      // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MzdlZWQ2NzUzNTFkZGZkZWZkZjM3ZmEiLCJpYXQiOjE2NjkyNjQ0NjQsImV4cCI6MTY2OTY5NjQ2NH0.C7qBNCzPfDwO4XDcxU7VEzR350pv-2P-aTcvyJQ97pU"
      // Verify Token
      const { userID, type } = jwt.verify(token, process.env.JWT_SECRET_KEY)
      // Get User from Token
      if (type === "individual") {
        req.user = await Individuals.findById(userID).select('-password')
        req.type = "individual"
      }
      else if (type === "organization") {
        req.user = await Organizations.findById(userID).select('-password')
        req.type = "organization"
      }
      else {
        req.user = await Admins.findById(userID).select('-password')
        req.type = "admin"
      }
      next()
    } catch (error) {
      console.log(error)
      res.status(401).send({ "status": "failed", "message": "Unauthorized User" })
    }
  }
  if (!token) {
    res.status(401).send({ "status": "failed", "message": "Unauthorized User, No Token" })
  }
}

module.exports = checkIndividualAuth