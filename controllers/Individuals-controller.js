const Individuals = require('../models/Individual')
const bcrypt = require('bcrypt')

const getAllIndividuals = async (req, res) => {
    console.log(req.user)
    console.log(req.type)
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
};

const getById = async (req, res) => {
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
};

const addIndividual = async (req, res, next) => {
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
};

const updateIndividual = async (req, res, next) => {
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
};

const deleteIndividual = async (req, res, next) => {
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
  };

  module.exports = {
    getAllIndividuals,
    getById,
    addIndividual,
    updateIndividual,
    deleteIndividual
  }