const Individuals = require('../models/Individual')
const bcrypt = require('bcrypt')
const Requests = require('../models/Request')

const getAllIndividuals = async (req, res) => {
  if (req.type === "admin") {
    let individuals;
    try {
      individuals = await Individuals.find();
    } catch (err) {
      console.log(err);
    }

    if (!individuals) {
      return res.status(404).json({ message: "No Individual found" });
    }
    return res.status(200).json({ individuals });
  }
  else {
    res.status(404).json({ message: "Access Denied" })
  }
};

const getById = async (req, res) => {
  if (req.type === "admin") {
    const id = req.params.id;
    let individual;
    try {
      individual = await Individuals.findById(id);
    } catch (err) {
      console.log(err);
    }
    if (!individual) {
      return res.status(404).json({ message: "No Individual found" });
    }
    return res.status(200).json({ individual });
  }
  else {
    res.status(404).json({ message: "Access Denied" })
  }
};

const addIndividual = async (req, res) => {
  if (req.type === "admin") {
    const { name, username, email, password, age, phone, cnic, bloodgroup, address, lastdonation } = req.body;
    let individual;
    try {
      individual = new Individuals({
        name, username, email, password, age, phone, cnic, bloodgroup, address, lastdonation
      });
      const salt = await bcrypt.genSalt(10)
      individual.password = await bcrypt.hash(password, salt)
      await individual.save();
    } catch (err) {
      console.log(err);
    }

    if (!individual) {
      return res.status(500).json({ message: "Unable To Add" });
    }
    return res.status(201).json({ individual });
  }
  else {
    res.status(404).json({ message: "Access Denied" })
  }
};

const updateIndividual = async (req, res) => {
  if (req.type === "admin") {
    const id = req.params.id;
    const { name, username, email, password, age, phone, cnic, bloodgroup, address, lastdonation } = req.body;
    let individual;
    try {
      individual = await Individuals.findByIdAndUpdate(id, {
        name, username, email, password, age, phone, cnic, bloodgroup, address, lastdonation
      });
      individual = await individual.save();
    } catch (err) {
      console.log(err);
    }
    if (!individual) {
      return res.status(404).json({ message: "Unable To Update By this ID" });
    }
    return res.status(200).json({ individual });
  }
  else {
    res.status(404).json({ message: "Access Denied" })
  }
};

const deleteIndividual = async (req, res) => {
  if (req.type === "admin") {
    const id = req.params.id;
    let individual;
    try {
      individual = await Individuals.findByIdAndRemove(id);
    } catch (err) {
      console.log(err);
    }
    if (!individual) {
      return res.status(404).json({ message: "Unable To Delete By this ID" });
    }
    return res.status(200).json({ message: "Product Successfully Deleted" });
  }
  else {
    res.status(404).json({ message: "Access Denied" })
  }
};



module.exports = {
  getAllIndividuals,
  getById,
  addIndividual,
  updateIndividual,
  deleteIndividual
}