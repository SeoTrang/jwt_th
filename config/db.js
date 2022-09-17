const mongoose = require('mongoose');

async function connect(){
    try {
        await mongoose.connect('mongodb://localhost:27017/jwt_th');
        console.log('mongodb connected!');
    } catch (error) {
        console.log('mongodb not connected!!');
        console.log(error);
    }
}


module.exports = {connect};