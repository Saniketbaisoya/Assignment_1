const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    userName : {
      type : String,
      required : true,
      unique : true
    },
    password : {
        type : String,
        required : true
    },
    referralUsername : {
        type : String,
        required : true
    },
    referral : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }]
},{timestamps : true})

userSchema.pre('save',async function (next){
    const genSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password,genSalt);
    this.password = hashedPassword;
    next();
})
const User = mongoose.model("User",userSchema);

module.exports = User;