const { Quatation } = require('../models')

module.exports = {
    //get all
    async index(req, res) {
        try {
            const quatations = await Quatation.findAll()
            res.send(quatations)
        } catch (err) {
            res.status(500).send({
                error: 'the Company information was incorrect'
            })
        }
    },


    // create
    async create(req, res) {
        try {
            const quatation = await Quatation.create(req.body)
            res.send(quatation.toJSON())
        } catch (err) {
            res.status(500).send({
                error: 'Create Company incorrect'
            })
        }
    },

    // edit
    async put(req, res) {
        try {
            await Quatation.update(req.body, {
                where: {
                    id: req.params.quatationId
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send({
                error: 'Update Company incorrect'
            })
        }
    },

    // delete
    async delete(req, res) {
        try {
            const quatation = await Quatation.findOne({
                where: {
                    id: req.params.quatationId
                }
            })
            if (!quatation) {
                return res.status(403).send({
                    error: 'The Company information was incorrect'
                })
            }
            await quatation.destroy()
            res.send(quatation)
        } catch (err) {
            res.status(500).send({
                error: 'The Company information was incorrect'
            })
        }
    },

    async show(req, res) {
        try {
            const quatation = await Quatation.findByPk(req.params.quatationId)
            res.send(quatation)
        } catch (err) {
            res.status(500).send({
                error: 'The Company information was incorrect'
            })
        }
    },
}
