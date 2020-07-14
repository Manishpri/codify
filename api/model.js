const mongoose = require('mongoose');

const agencySchema = mongoose.Schema({
   
    name : {
        type : String,
        required:true
    },
    address1 : {
        type : String,
        required:true
    },
    address2 : {
        type : String
    },
    city : {
        type : String,
        required:true
    },
    phoneNum : {
        type : Number,
        required:true
    }
});
const clientSchema = mongoose.Schema({
    agencyId : {
        type : String,
        required:true
    },
    name : {
        type : String,
        required:true
    },
    email : {
        type : String,
        required:true
    },
    phoneNum : {
        type : Number,
        required:true
    },
    totalBill : {
        type : Number,
        required:true
    }
})

const agencyschema = mongoose.model('agency',agencySchema);
const clientschema = mongoose.model('client',clientSchema);

module.exports = {agencyschema,clientschema};