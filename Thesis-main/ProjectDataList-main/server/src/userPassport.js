const passport = require('passport')
const { Person } = require('./models')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const config = require('./config/config')

passport.use('person',
    new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.authentication.jwtSecret
    }, async function (jwtPayload, done) {
        try {
            const person = await Person.findOne({
                where: {
                    email: jwtPayload.email
                }
            })

            if (!person) {
                return done(new Error(), false)
            }
            return done(null, person)
        } catch (err) {
            return done(new Error(), false)
        }
    })
)
module.exports = null 