const { Post_Company } = require('../models')

module.exports = {
    //get all
    async index(req, res) {
        try {
            const postCs = await Post_Company.findAll()
            res.send(postCs)
        } catch (err) {
            res.status(500).send({
                error: 'the Company information was incorrect'
            })
        }
    },


    // create
    async create(req, res) {
        try {
            const postC = await Post_Company.create(req.body)
            res.send(postC.toJSON())
        } catch (err) {
            res.status(500).send({
                error: 'Create Company incorrect'
            })
        }
    },

    // edit
    async put(req, res) {
        try {
            await Post_Company.update(req.body, {
                where: {
                    id: req.params.postCId
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
            const postC = await Post_Company.findOne({
                where: {
                    id: req.params.postCId
                }
            })
            if (!postC) {
                return res.status(403).send({
                    error: 'The Company information was incorrect'
                })
            }
            await postC.destroy()
            res.send(postC)
        } catch (err) {
            res.status(500).send({
                error: 'The Company information was incorrect'
            })
        }
    },

    async show(req, res) {
        try {
            const postC = await Post_Company.findByPk(req.params.postCId)
            res.send(postC)
        } catch (err) {
            res.status(500).send({
                error: 'The Company information was incorrect'
            })
        }
    },
}
