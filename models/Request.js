const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    senderID: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    body: { 
        type: String,
        required: true
    },
    phone: { 
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
    status: { 
        type: Boolean,
        required: true,
        default: true   //true means it is not resolved yet
    },
});

module.exports =  mongoose.model("Request", userSchema);
