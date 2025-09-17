const User = require("../Schema/user.model.js");
const AppError = require("../utlis/errors/error.js");
const {StatusCodes} = require('http-status-codes');

async function userCreate(data) {
    const user = await User.findOne({userName : data.userName});
    if(user){
        throw new AppError("This user already exists !!",StatusCodes.BAD_GATEWAY);
    }
    const referralInfo = await User.findOne({userName : data.referralUsername});
    if(!referralInfo){
        throw new AppError("The referral data not found !!",StatusCodes.BAD_REQUEST);
    }
    const response = await User.create(data);

    await referralInfo.referral.push(response._id);
    await referralInfo.save();
    return response;
}

async function getUserById(data) {
    const userNamePayload = data.userName;
    const response = await User.findOne(userNamePayload)
        .populate({
        path : "referral",
        populate: {
            path : "referral",
            populate: {
                path : "referral",
                populate : {
                    path : "referral",
                    populate : {
                        path : "referral",
                        populate : {
                            path : "referral",
                            populate : {
                                path : "referral",
                                populate : {
                                    path : "referral",
                                    populate : {
                                        path : "referral",
                                        populate : {
                                            path : "referral", // upto 10th hierarchy....
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }).lean();

    if(!response){
        throw new AppError("User not found !!",StatusCodes.BAD_REQUEST);
    }

    const reformData = (u)=> ({
        userName : u.userName,
        referral : u.referral ? u.referral.map(reformData) : []
    });

    /**
     * Now reform data ka use isliye because we only need the userName and referral info so we need to reform it....
     * Now starting mai hmm apne A user ko pass krte hai
     * Then phr reform data A ke referral mai jata hai and if the referral exists then uska data aajayega 
     * Now aise krte jayege upto the 10th hierarchy and if hierarchy is closed then we return the empty array...
     */
    const hierarchy = reformData(response);
    return hierarchy;

}
module.exports = {
    userCreate,
    getUserById
};