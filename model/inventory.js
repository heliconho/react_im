const mongoose = require('mongoose');

const inventoryModel = mongoose.Schema({
    inventoryName : {
        type: String,
        required: true
    },
    sku: {
        type:String,
        required:true
    },
    description : {
        type:String
    },
    quantity: {
        type:Number,
        required:true
    },
    keyword: [{
        type: String
    }],
    category: [{
        type:String
    }],
    user : {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "users"
    }
},{timestamps:true});

module.exports = new mongoose.model("inventory",inventoryModel)

/*
*/