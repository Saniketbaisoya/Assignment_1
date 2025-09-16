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
module.exports = {
    userRegister
}