const Admins = require('../models/Admin')
const bcrypt = require('bcrypt')

const getAllAdmins = async (req, res) => {
  if (req.type === "admin") {
    let admins;
    try {
      admins = await Admins.find();
    } catch (err) {
      console.log(err);
    }

    if (!admins) {
      return res.status(404).json({ message: "No Admins found" });
    }
    return res.status(200).json({ admins });
  }
  else {
    res.status(404).json({ message: "Access Denied" })
  }
};

const getById = async (req, res) => {
  if (req.type === "admin") {
    const id = req.params.id;
    let admin;
    try {
      admin = await Admins.findById(id);
    } catch (err) {
      console.log(err);
    }
    if (!admin) {
      return res.status(404).json({ message: "No Individual found" });
    }
    return res.status(200).json({ admin });
  }
  else {
    res.status(404).json({ message: "Access Denied" })
  }
};

const addAdmin = async (req, res) => {
  if (req.type === "admin") {
    const { name, username, email, password } = req.body;
    let admin;
    try {
      admin = new Admins({
        name, username, email, password
      });
      const salt = await bcrypt.genSalt(10)
      admin.password = await bcrypt.hash(password, salt)
      await admin.save();

    } catch (err) {
      console.log(err);
    }

    if (!admin) {
      return res.status(500).json({ message: "Unable To Add" });
    }
    return res.status(201).json({ admin });
  }
  else {
    res.status(404).json({ message: "Access Denied" })
  }
};


const updateAdmin = async (req, res) => {
  if (req.type === "admin") {
    const id = req.params.id;
    const { name, username, email, password } = req.body;
    let admin;
    try {
      admin = await Admins.findByIdAndUpdate(id, {
        name, username, email, password
      });
      admin = await admin.save();
    } catch (err) {
      console.log(err);
    }
    if (!admin) {
      return res.status(404).json({ message: "Unable To Update By this ID" });
    }
    return res.status(200).json({ admin });
  }
  else {
    res.status(404).json({ message: "Access Denied" })
  }
};

const deleteAdmin = async (req, res) => {
  if (req.type === "admin") {
    const id = req.params.id;
    let admin;
    try {
      admin = await Admins.findByIdAndRemove(id);
    } catch (err) {
      console.log(err);
    }
    if (!admin) {
      return res.status(404).json({ message: "Unable To Delete By this ID" });
    }
    return res.status(200).json({ message: "Admin Successfully Deleted" });
  }
  else {
    res.status(404).json({ message: "Access Denied" })
  }
};

module.exports = {
  getAllAdmins,
  getById,
  addAdmin,
  updateAdmin,
  deleteAdmin
}