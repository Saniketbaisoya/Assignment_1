const User = require("../Schema/user.model.js");

async function userCreate(data) {
    const response = await User.create(data);
    return response;
}
module.exports = {
    userCreate
};