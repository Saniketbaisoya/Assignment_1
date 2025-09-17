const { userService } = require("../service");
const ErrorResponse = require("../utlis/errorResponse");
const  SuccessResponse  = require("../utlis/SuccessResponse");
const {StatusCodes} = require('http-status-codes');

async function userRegister_Controller(req,res) {
    try {
        const response = await userService.userRegister(req.body);
        SuccessResponse.message = "SuccessFully created the user...";
        SuccessResponse.data = response;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = error.messaage;
        ErrorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function getUserById_Controller(req,res) {
    try {
        const userName = req.params.userName;
        const response = await userService.getUserById(userName);
        SuccessResponse.message = "SuccessFully fetch the user along with referral details...";
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = error.messaage;
        ErrorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}
module.exports = {
    userRegister_Controller,
    getUserById_Controller
}