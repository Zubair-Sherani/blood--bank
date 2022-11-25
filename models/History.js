const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    requester: {
        type: String,
        required: true
    },
    patientName: { 
        type: String,
        required: true
    },
    cnic: { 
        type: String,
        required: true
    },
    bloodgroup: { 
        type: String,
        required: true
    },
    disease: { 
        type: String,
        required: true
    },
    address: { 
        type: String,
        required: true
    },
    donor: {
        type: String,
        required: true
    }
});

module.exports =  mongoose.model("History", userSchema);
