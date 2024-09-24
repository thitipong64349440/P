const { where } = require('sequelize')
const {Message} = require('../models')

module.exports = {
    async index(req, res) {
        try {
            const messages = await Message.findAll()
        return res.json(messages)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occurred trying to fetch the messages'
            })
        }
    },

    async shop(req, res) {
        try {
            const message = await Message.findAll({
                where: {
                    shopId: req.params.shopId
                },
                order: [['updatedAt', 'DESC']]
            })

            res.send(message)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occurred trying to fetch the messages'
            })
        }
    },

    async person(req, res) {
        try {
            const message = await Message.findAll({
                where: {
                    personId: req.params.personId
                },
                order: [['updatedAt', 'DESC']]
            })
            res.send(message)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occurred trying to fetch the messages'
            })
        }
    },

    async create(req, res) {
        try {
            const message = await Message.create(req.body)
            res.send(message.toJSON())
        } catch (err) {
            res.status(500).send({
                error: 'An error has occurred trying to create the message'
            })
        }
    },

    async put(req, res) {
        try {
            await Message.update(req.body, {
                where: {
                    id: req.params.messageId
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send({
                error: 'Update Message incorrect'
            })
        }
    },

    // delete
    async delete(req, res) {
        try {
            const message = await Message.findOne({
                where: {
                    id: req.params.messageId
                }
            })
            if (!message) {
                return res.status(403).send({
                    error: 'The Company information was incorrect'
                })
            }
            await message.destroy()
            res.send(message)
        } catch (err) {
            res.status(500).send({
                error: 'The Company information was incorrect'
            })
        }
    },

    async show(req, res) {
        try {
            const message = await Message.findByPk(req.params.messageId)
            res.send(message)
        } catch (err) {
            res.status(500).send({
                error: 'The Company information was incorrect'
            })
        }
    }
}