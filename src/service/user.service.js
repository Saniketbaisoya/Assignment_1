const { userRepository } = require("../repositories")

async function userRegister(data) {
    const payload = {
        userName : data.userName,
        password : data.password,
        referralUsername : data.referralUsername
    }
    const user = await userRepository.userCreate(payload);
    return user;
}

async function getUserById(data) {
    console.log("inside service -> 1")
    const user = await userRepository.getUserById({userName : data.userName});
    console.log(user);
    return user;
}
module.exports = {
    userRegister,
    getUserById
}