const Organizations = require('../models/Organization')
const bcrypt = require('bcrypt')

const getAllOrgranizations = async (req, res) => {
  if (req.type === 'admin') {
    let organizations;
    try {
      organizations = Organizations.find();
    } catch (err) {
      console.log(err);
    }

    if (!organizations) {
      return res.status(404).json({ message: "No Organization found" });
    }
    return res.status(200).json({ organizations });
  }
  else {
    return res.status(404).json({ message: "Access Denied" });
  }
}

const getById = async (req, res, next) => {
  if (req.type === 'admin') {
    const id = req.params.id;
    let organization;
    try {
      organization = await Organizations.findById(id);
    } catch (err) {
      console.log(err);
    }
    if (!organization) {
      return res.status(404).json({ message: "No Organization found" });
    }
    return res.status(200).json({ organization });
  }
  else {
    return res.status(404).json({ message: "Access Denied" });
  }
};

const addOrganization = async (req, res) => {
  if (req.type === 'admin') {
    const { name, username, email, password, phone, address } = req.body;
    let organization;
    try {
      organization = new Organizations({
        name, username, email, password, phone, address
      });
      const salt = await bcrypt.genSalt(10)
      organization.password = await bcrypt.hash(password, salt)
      await organization.save();
    } catch (err) {
      console.log(err);
    }
    if (!organization) {
      return res.status(500).json({ message: "Unable To Add" });
    }
    return res.status(201).json({ organization });
  }
  else {
    return res.status(404).json({ message: "Access Denied" });
  }
};

const updateOrganization = async (req, res) => {
  if (req.type === 'admin') {
    const id = req.params.id;
    const { name, username, email, password, phone, address } = req.body;
    let organization;
    try {
      organization = await Organizations.findByIdAndUpdate(id, {
        name, username, email, password, phone, address
      });
      organization = await organization.save();
    } catch (err) {
      console.log(err);
    }
    if (!organization) {
      return res.status(404).json({ message: "Unable To Update By this ID" });
    }
    return res.status(200).json({ organization });
  }
  else {
    return res.status(404).json({ message: "Access Denied" });
  }
};

const deleteOrganization = async (req, res) => {
  if (req.type === 'admin') {
    const id = req.params.id;
    let organization;
    try {
      organization = await Organizations.findByIdAndRemove(id);
    } catch (err) {
      console.log(err);
    }
    if (!organization) {
      return res.status(404).json({ message: "Unable To Delete By this ID" });
    }
    return res.status(200).json({ message: "Organization Successfully Deleted" });
  }
  else {
    return res.status(404).json({ message: "Access Denied" });
  }
};

module.exports = {
  getAllOrgranizations,
  getById,
  addOrganization,
  updateOrganization,
  deleteOrganization
}