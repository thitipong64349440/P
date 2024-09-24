const { Person } = require('../models')

module.exports = {
    //get all
    async index(req, res) {
        try {
            const persons = await Person.findAll()
            res.send(persons)
        } catch (err) {
            res.status(500).send({
                error: 'the Person information was incorrect'
            })
        }
    },


    // create
    async create(req, res) {
        try {
            const person = await Person.create(req.body)
            res.send(person.toJSON())
        } catch (err) {
            res.status(500).send({
                error: 'Create Person incorrect'
            })
        }
    },

    // edit
    async put(req, res) {
        try {
            await Person.update(req.body, {
                where: {
                    id: req.params.personId
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send({
                error: 'Update Person incorrect'
            })
        }
    },

    // delete
    async delete(req, res) {
        try {
            const person = await Person.findOne({
                where: {
                    id: req.params.personId
                }
            })
            if (!person) {
                return res.status(403).send({
                    error: 'The Person information was incorrect'
                })
            }
            await person.destroy()
            res.send(person)
        } catch (err) {
            res.status(500).send({
                error: 'The Person information was incorrect'
            })
        }
    },

    async show(req, res) {
        try {
            const person = await Person.findByPk(req.params.personId)
            res.send(person)
        } catch (err) {
            res.status(500).send({
                error: 'The Person information was incorrect'
            })
        }
    },
}
