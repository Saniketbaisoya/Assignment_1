const { userRepository } = require("../repositories");
const AppError = require("../utlis/errors/error.js");
const {StatusCodes} = require('http-status-codes');
async function userRegister(data) {
    /**
     * if the user corresponding to the userName is not exists
     * Then we create a new user...
    */
    const payload = {
        userName : data.userName,
        password : data.password,
        referralUsername : data.referralUsername
    }
    
    const user = await userRepository.userCreate(payload);
    return user;
}
module.exports = {
    userRegister
}