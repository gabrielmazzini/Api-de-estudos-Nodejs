const bcrypt = require('bcryptjs')
const User = require('../models/user_models')

module.exports = app => {
    
            const save = async (req, res) => {
            const { name, email, password, confirmPassword} = req.body
           
            if(!name) {
                return res.status(422).json({msg: 'Name is required'})
            }
        
            if(!email) {
                return res.status(422).json({msg: 'Email is required'})
            }
        
            if(!password) {
                return res.status(422).json({msg: 'Password is required'})
            }
        
            if(password != confirmPassword) {
                return res.status(422).json({msg: 'Passwords are not the same'})
            }
        
            //verificar usuario
            const userExist = await User.findOne({email: email})
        
            if(userExist) {
                return res.status(422).json({msg: 'Please use another email!'})
            }
        
            //security password
            const salt = await bcrypt.genSalt(12)
            const passHash = await bcrypt.hash(password, salt)
        
            //create user
            const user = new User({
            name,
            email,
            password: passHash
        })
        
            try {
                await user.save()
                res.status(201).json({msg: "User successfully registered!"})
            } catch {
            console.log(erro)
            res.status(500).json({msg: "Server error, please try again later!"})
            }
        
        

        }

            return { save }
}   