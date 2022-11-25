const jwt = require('jsonwebtoken')
const Individuals = require('../models/Individual')

var checkIndividualAuth = async (req, res, next) => {
  let token
  const { authorization } = req.headers
  if (authorization && authorization.startsWith('Bearer') || 1) {
    try {
      // Get Token from header
      token = authorization.split(' ')[1]
      // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MzdlZWQ2NzUzNTFkZGZkZWZkZjM3ZmEiLCJpYXQiOjE2NjkyNjQ0NjQsImV4cCI6MTY2OTY5NjQ2NH0.C7qBNCzPfDwO4XDcxU7VEzR350pv-2P-aTcvyJQ97pU"
      // Verify Token
      const { userID } = jwt.verify(token, "dhsjf3423jhsdf3423df")
      console.log("id")
      console.log(userID)
      // Get User from Token
      req.user = await Individuals.findById(userID).select('-password')
      req.type = "individual"
      console.log(req)

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