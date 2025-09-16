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

module.exports = {
    userRegister_Controller
}