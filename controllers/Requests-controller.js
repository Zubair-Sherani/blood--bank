const Requests = require('../models/Request')

const getAllRequests = async (req, res, next) => {
    let requests;
    try {
        requests = await Requests.find();
    } catch (err) {
        console.log(err);
    }

    if (!requests) {
        return res.status(404).json({ message: "No Requests found" });
    }
    return res.status(200).json({ requests });
};

const getById = async (req, res, next) => {
    const id = req.params.id;
    let request;
    try {
        request = await Requests.findById(id);
    } catch (err) {
        console.log(err);
    }
    if (!request) {
        return res.status(404).json({ message: "No Request found" });
    }
    return res.status(200).json({ request });
};

const addRequest = async (req, res, next) => {
    const { senderID, date, body, phone, patientName, cnic, bloodgroup, disease, address, status } = req.body;
    let request;
    try {
        request = new Requests({
            senderID, date, body, phone, patientName, cnic, bloodgroup, disease, address, status
        });
        await request.save();
    } catch (err) {
        console.log(err);
    }

    if (!request) {
        return res.status(500).json({ message: "Unable To Add" });
    }
    return res.status(201).json({ request });
};


const updateRequest = async (req, res, next) => {
    const id = req.params.id;
    const { senderID, date, body, phone, patientName, cnic, bloodgroup, disease, address, status } = req.body;
    let request;
    try {
      request = await Requests.findByIdAndUpdate(id, {
        senderID, date, body, phone, patientName, cnic, bloodgroup, disease, address, status
      });
      request = await request.save();
    } catch (err) {
      console.log(err);
    }
    if (!request) {
      return res.status(404).json({ message: "Unable To Update By this ID" });
    }
    return res.status(200).json({ request });
};

const deleteRequest = async (req, res, next) => {
    const id = req.params.id;
    let request;
    try {
      request = await Requests.findByIdAndRemove(id);
    } catch (err) {
      console.log(err);
    }
    if (!admin) {
      return res.status(404).json({ message: "Unable To Delete By this ID" });
    }
    return res.status(200).json({ message: "Request Successfully Deleted" });
  };

  module.exports = {
    getAllRequests,
    getById,
    addRequest,
    updateRequest,
    deleteRequest
  }