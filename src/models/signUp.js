const mongoose = require("mongoose");

const bloggerSchema = new mongoose.Schema ({
    Name : {
        type: String,
        required : true
    },

    Email : {
        type: String,
        required : true,
        unique : true,
    },

    Password : {
        type: String,
        required : true,
    },

    ConfirmPassword : {
        type: String,
        required : true
    },
})

// Create a Collection

const signup = new mongoose.model("signup",bloggerSchema);

module.exports = signup;

