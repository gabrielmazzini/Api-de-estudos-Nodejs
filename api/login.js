require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user_models')

module.exports = app => {

        const logar = async (req, res) => {

        const {email, password} = req.body
    
        //validations
        if (!email) {
           return res.status(404).json({msg: "User is required!"})
        }
    
        if (!password) {
           return res.status(422).json({msg: "Password is required!"})
        }
    
        //verify exist user
        const user = await User.findOne({email: email})
    
        if (!user) {
           return res.status(401).json({msg: "User not found!"})
        }
    
        //verify password
        const checkPassword = await bcrypt.compare(password, user.password)
    
        if (!checkPassword) {
            return res.status(422).json({msg: "Invalid password!"})
        }
    
        //token generation
        const secret = process.env.SECRET
        const now = Math.floor(Date.now() / 1000)

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            iat: now,
            exp: now + (60 * 60 * 24 * 3)
        }

        res.json({
            ...payload,
            token: jwt.sign(payload, secret)
        })

        //function validation token
        const validateToken = async (req, res) => {
            const userData = req.body || null
            try {
                if (userData) {
                    const token = jwt.decode(userData.token, secret)
                if (new Date(token.exp * 1000) > new Date())
                    return res.send(true)
                }
            } catch (err){

            }

            res.send(false)
        }
    
    }

    return { logar }
}