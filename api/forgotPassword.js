const bcrypt = require('bcryptjs')
const User = require('../models/user_models')
const crypto = require('crypto')
const mailer = require('../modules/mailer')
const { now } = require('mongoose')

module.exports = app => {
    const forgotPass = async (req, res) => {
        const { email } = req.body

        try {
            const user = await User.findOne({ email })

            if (!user) 
                return res.status(400).json({msg: "Error: user not found"})

            // token generation
            const token = crypto.randomBytes(20).toString('hex')

            //token expiration
            const now = new Date()
            now.setHours(now.getDate() + 1)

            //modify user
        await User.findByIdAndUpdate(user.id,{
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: now
            }
        })

        //Send Mail
       mailer.sendMail({
        to: email,
        from: 'gabrielmazzini@bol.com.br',
        template: 'auth/forgot_pass',
        context: {token},
       }, (err) => {
        console.log(err)
        if(err)
        return res.status(400).json({msg: "Error: Email cannot be sent"})

        return res.status(200).json({msg: "Email successfully sent"})
       })
      
        } catch (err) {
            
            res.status(400).json({msg: "Error: try again later"})
        }
    } 

    return { forgotPass }
}