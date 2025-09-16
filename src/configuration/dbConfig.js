const mongoose = require('mongoose');
const { MONGODB_URL } = require('./serverConfig');

async function connectDB() {
    try{
        await mongoose.connect(MONGODB_URL);
        console.log("SuccessFully Connected to the db server....")
    }catch(error){
        console.log("Failed to connect to MongoDB");
        console.log(error);
    }
}
module.exports = {connectDB};
