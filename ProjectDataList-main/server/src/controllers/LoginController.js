const { Person } = require('../models')
const config = require('../config/config')
const jwt = require('jsonwebtoken')

function jwtSignUser(person) {
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(person, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}
module.exports = {
    async register(req, res) {
        try {
            const person = await Person.create(req.body)
            res.send(person.toJSON())
        } catch (error) {
            res.status(400).send({
                error: 'The content information was incorrect'
            })
        }
    },
    async login(req, res) {
        try {
            const { email, password } = req.body
            const person = await Person.findOne({
                where: {
                    email: email
                }
            })
            if (!person) {
                return res.status(403).send({
                    error: 'User/Password not correct'
                })
            }
            const isPasswordValid = await person.comparePassword(password)
            if (!isPasswordValid) {
                return res.status(403).send({
                    error: 'User/Password not correct'
                })
            }
            const personJSON = person.toJSON()
            res.send({
                person: personJSON,
                token: jwtSignUser(personJSON)
            })

        } catch (error) {
            res.status(500).send({
                error: 'Error! from get user'
            })
        }
    }
}