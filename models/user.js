let mongoose = require('mongoose');

const Schema = mongoose.Schema;

const users = new Schema({
    name        :{type:String,require:true},
    avatar      :{type:String,require:false},
    email       :{type:String,require:true},
    password    :{type:String,require:true},
    admin       :{type:Boolean,require:true},
    refreshtoken :{type:String}
});

module.exports = mongoose.model('users',users);