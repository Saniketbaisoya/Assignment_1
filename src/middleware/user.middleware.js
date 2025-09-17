const ErrorResponse = require("../utlis/errorResponse");
const {StatusCodes} = require('http-status-codes');

async function userValidation(req,res,next) {
    if(!req.body.userName){
        ErrorResponse.message = "Something went wrong can't created the user";
        ErrorResponse.error = {explanation : "userName is not found in the incoming request"};
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.password){
        ErrorResponse.message = "Something went wrong can't created the user";
        ErrorResponse.error = {explanation : "password is not found in the incoming request"};
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}
module.exports = {
    userValidation,
    userGetValidation
}