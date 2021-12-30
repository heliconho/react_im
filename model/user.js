const mongoose = require('mongoose');

const userModel = mongoose.Schema({
    email : {
        type: String,
        required: true
    },
    password: {
        type:String,
        required:true
    },
    login: {
        type:Boolean,
        requited:true
    }
    }
    ,{timestamps:true});

module.exports = new mongoose.model("users",userModel)

/*
*/