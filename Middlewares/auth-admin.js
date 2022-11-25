const jwt = require('jsonwebtoken')
const Admins = require('../models/Admin')
const Organizations = require('../models/Organization')
const Individuals = require('../models/Individual')


var checkIndividualAuth = async (req, res, next) => {
  let token
  const { authorization } = req.headers
  if (authorization && authorization.startsWith('Bearer')) {
    try {
      // Get Token from header
      token = authorization.split(' ')[1]
      // Verify Token
      const { userID, type } = jwt.verify(token, process.env.JWT_SECRET_KEY)
     
      req.user = await Admins.findById(userID).select('-password')
      
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