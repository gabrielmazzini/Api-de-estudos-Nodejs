const User = require('../models/user_models')
const bcrypt = require('bcryptjs')

module.exports = app => {
    const resetPass = async (req, res) => {
        const { email, token, password} = req.body

        try {
            const user = await User.findOne({email})
            .select('+ passwordResetToken passwordResetExpires')

        if(!user)
            return res.status(400).json({msg: "User not found"})

        if(token !== user.passwordResetToken)
            return res.status(400).json({msg: "Inválid token"})

        //verify experide token
        const now = new Date()
        if(now > user.passwordResetExpires)
            return res.status(400).json({msg: "Error: expired token"})
        
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)
        user.password = passwordHash

        await user.save()

        res.status(200).json({msg: "Password successfully changed"})

        } catch (err) {
            return res.status(400).json({msg: "Error: try again later"})
        }
    }

    return { resetPass }
}