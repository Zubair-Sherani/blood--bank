const History = require('../models/History')

const getAllHistory = async (req, res, next) => {
    let history;
    try {
        history = await History.find();
    } catch (err) {
        console.log(err);
    }

    if (!history) {
        return res.status(404).json({ message: "No History found" });
    }
    return res.status(200).json({ history });
};

const getById = async (req, res, next) => {
    const id = req.params.id;
    let history;
    try {
        history = await History.findById(id);
    } catch (err) {
        console.log(err);
    }
    if (!history) {
        return res.status(404).json({ message: "No History found" });
    }
    return res.status(200).json({ history });
};

const addHistory = async (req, res, next) => {
    const { requester, patientName, cnic, bloodgroup, disease, address, donor } = req.body;
    let history;
    try {
        history = new History({
            requester, patientName, cnic, bloodgroup, disease, address, donor
        });
        await history.save();
    } catch (err) {
        console.log(err);
    }

    if (!history) {
        return res.status(500).json({ message: "Unable To Add" });
    }
    return res.status(201).json({ history });
};

  module.exports = {
    getAllHistory,
    getById,
    addHistory  
}