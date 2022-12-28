require('dotenv').config()
const User = require('../models/user_models')
const passport = require('passport')
const passportJwt = require('passport-jwt')

const secret = process.env.SECRET

const { Strategy, ExtractJwt } = passportJwt

module.exports = app => {
    const params = {
        secretOrKey: secret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    passport.use(new Strategy(params, async (payload, done) => {
        await User.findOne({id: payload.id})
        .then(user => done(null, user ? {...payload} : false))
        .catch(err => done(err, false))
        
    }))

    return {
        authenticate: () => passport.authenticate('jwt', { session: false })
    }
}