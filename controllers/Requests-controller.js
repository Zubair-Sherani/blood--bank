const Requests = require('../models/Request')

const getAllRequests = async (req, res) => {
  if (req.type === 'admin') {
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
  }
  else {
    let requests;
    try {
      requests = await Requests.find({ senderID: req.user._id });
    } catch (err) {
      console.log(err);
    }
    if (!requests) {
      return res.status(404).json({ message: "No Requests found" });
    }
    return res.status(200).json({ requests });
  }
};

const getById = async (req, res) => {
  if (req.type === 'admin') {
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
  }
  else if (req.type === "individual" || req.type === "organization") {
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
    if (req.user._id.toString() === request.senderID) {
      return res.status(200).json({ request });
    }
    else {
      return res.status(404).json({ message: "Access Denied" });
    }
  }
  else {
    return res.status(404).json({ message: "Access Denied" });
  }
};

const addRequest = async (req, res) => {
  if (req.type === 'individual' || req.type === 'organization') {
    const { date, body, phone, patientName, cnic, bloodgroup, disease, address, status } = req.body;
    let senderID = req.user._id;
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
  }
  else {
    return res.status(404).json({ message: "Access Denied" });
  }
};

const updateRequest = async (req, res) => {
  if (req.type === 'admin') {
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
  }
  else if (req.type === "individual" || req.type === "organization") {
    const id = req.params.id;
    let request = await Requests.findById(id)
    if (req.user._id.toString() === request.senderID) {
      try {
        request = await Requests.findByIdAndUpdate(id, {
          senderID, date, body, phone, patientName, cnic, bloodgroup, disease, address, status
        });
        request = await request.save();
      } catch (err) {
        console.log(err);
      }
      return res.status(200).json({ request });
    }
    else {
      return res.status(404).json({ message: "Access Denied" });
    }
  }
  else {
    return res.status(404).json({ message: "Access Denied" });
  }
};

const deleteRequest = async (req, res) => {
  if (req.type === 'admin') {
    const id = req.params.id;
    let request;
    try {
      request = await Requests.findByIdAndRemove(id);
    } catch (err) {
      console.log(err);
    }
    if (!request) {
      return res.status(404).json({ message: "Unable To Delete By this ID" });
    }
    return res.status(200).json({ message: "Request Successfully Deleted" });
  }
  else if (req.type === "individual" || req.type === "organization") {
    const id = req.params.id;
    let request = await Requests.findById(id)
    if(!request){
      console.log("request not found")
    }
    // console.log(req.user._id.toString())
    // console.log("next")
    // console.log(request.senderID)
    if (req.user._id.toString() === request.senderID) {
      try {
        request = await Requests.findByIdAndRemove(id);
      } catch (err) {
        console.log(err);
      }
      return res.status(200).json({ request });
    }
    else {
      return res.status(404).json({ message: "Access Denied" });
    }
  }
  else {
    return res.status(404).json({ message: "Access Denied" });
  }
};





const getIndividualRequests = async (req, res) => {
  if ((req.type === "individual" && req.user.id === res.params.id) || req.type === "admin") {
    let requests
    try {
      requests = await Requests.find({ senderID: req.params.id });
    } catch (err) {
      console.log(err);
    }
    if (!requests) {
      return res.status(404).json({ message: "No Request found found" });
    }
    return res.status(200).json({ requests });
  }
  else {
    res.status(404).json({ message: "Access Denied" })
  }
}

const deleteIndividualRequests = async (req, res) => {
  if ((req.type === "individual" && req.user.id === res.params.id) || req.type === "admin") {
    let requests
    try {
      requests = await Requests.findOneAndRemove({ senderID: req.params.id })
    } catch (err) {
      console.log(err);
    }
    if (!requests) {
      return res.status(404).json({ message: "No Request found" });
    }
    return res.status(200).json({ requests });
  }
  else {
    res.status(404).json({ message: "Access Denied" })
  }
}

module.exports = {
  getAllRequests,
  getById,
  addRequest,
  updateRequest,
  deleteRequest,
  getIndividualRequests,
  deleteIndividualRequests
}