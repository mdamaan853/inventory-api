const mongoose = require('../db.config')
const userschema = new mongoose.Schema({
    email: {
        type: String,
        pattern: "@mongodb\.com$",
        required: true,
        description: "Must be a valid email",
    },
    password: {
        type: String,
        required: true,
        // regex = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8, 20}$",
        description: "enter valid 8 digit password"
    },
    date: {
        type: Date
    }
})
const usermodel = mongoose.model('user', userschema);
module.exports = usermodel;