const mongoose = require('mongoose')

const User =  mongoose.model('user_models', {
    name: String,
    email: String,
    password: String,

    passwordResetToken: {
        type: String,
        select: false,
    },
    
    passwordResetExpires: {
        type: String,
        select: false,
    }
})

module.exports = User