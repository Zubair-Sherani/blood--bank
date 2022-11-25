const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    username: { 
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
    },
    password: { 
        type: String,
        required: true
    },
    age: { 
        type: Number,
        required: true
    },
    phone: { 
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
    address: { 
        type: String,
        required: true
    },
    lastdonation: { 
        type: Date,
        required: true,
        default: Date.now
    },
});

module.exports =  mongoose.model("Individual", userSchema);
