const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{ 
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
        required: true
    },
    password: { 
        type: String,
        required: true
    }
});

module.exports =  mongoose.model("Admin", userSchema);
