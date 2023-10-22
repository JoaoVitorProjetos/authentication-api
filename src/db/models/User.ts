const mongoose = require("mongoose");

const User = mongoose.model('User', {
    name: String,
    email: String,
    tel: String,
    password: String
})

export default User