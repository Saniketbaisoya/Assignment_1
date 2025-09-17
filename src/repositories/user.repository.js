const User = require("../Schema/user.model.js");
const AppError = require("../utlis/errors/error.js");
const {StatusCodes} = require('http-status-codes');

async function userCreate(data) { 
    const existUser = await User.findOne({userName : data.userName});
    if(existUser){
        throw new AppError("The user is already exists !!",StatusCodes.INTERNAL_SERVER_ERROR);
    }
    const referralInfo = await User.findOne({userName : data.referralUsername});
    if(!referralInfo){
        throw new AppError("The referral data is not present !!",StatusCodes.INTERNAL_SERVER_ERROR);
    }
    const response = await User.create(data);

    await referralInfo.referral.push(response._id);
    await referralInfo.save();
    return response;
}
module.exports = {
    userCreate
};