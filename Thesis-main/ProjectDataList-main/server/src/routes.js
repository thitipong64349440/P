const PersonController = require('./controllers/PersonController')
const LoginController = require('./controllers/LoginController')
const isAuthenController = require('./authen/isAuthenController')
const PostCController = require('./controllers/PostCController')
const ShopController = require('./controllers/ShopController')
const MessageController = require('./controllers/MessageController')
const QuatationController = require('./controllers/QuatationController')
let multer = require('multer')


module.exports = (app) => {
    let storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, "./public/uploads");
        },
        filename: function (req, file, callback) {
            // callback(null, file.fieldname + '-' + Date.now());
            console.log(file);
            callback(null, file.originalname);
        }
    })
    let upload = multer({ storage: storage }).array("userPhoto", 10)

    // Person
    app.get('/persons',
        isAuthenController,
        PersonController.index)

    app.post('/person', PersonController.create)

    app.put('/person/:personId', PersonController.put)

    app.delete('/person/:personId', PersonController.delete)

    app.get('/person/:personId', PersonController.show)

    // Login
    app.post('/login', LoginController.login)

    // Logout
    app.post('/logout', (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    })

    // PostC
    app.get('/postCs', PostCController.index)

    app.post('/postC', PostCController.create)

    app.put('/postC/:postCId', PostCController.put)

    app.delete('/postC/:postCId', PostCController.delete)

    app.get('/postC/:postCId', PostCController.show)

    // Shop
    app.get('/shops', ShopController.index)

    app.post('/shop', ShopController.create)

    app.put('/shop/:shopId', ShopController.put)

    app.delete('/shop/:shopId', ShopController.delete)

    app.get('/shop/:shopId', ShopController.show)

    // Message
    app.get('/messages', MessageController.index)

    app.get('/message/shop/:shopId', MessageController.shop)

    app.get('/message/person/:personId', MessageController.person)

    app.post('/message', MessageController.create)

    app.put('/message/:messageId', MessageController.put)

    app.delete('/message/:messageId', MessageController.delete)

    app.get('/message/:messageId', MessageController.show)

    // Quatation
    app.get('/quatations', QuatationController.index)

    app.post('/quatation', QuatationController.create)

    app.put('/quatation/:quatationId', QuatationController.put)

    app.delete('/quatation/:quatationId', QuatationController.delete)

    app.get('/quatation/:quatationId', QuatationController.show)

    // Upload
    app.post("/upload", function (req, res) {
        // isUserAuthenticated,
        upload(req, res, function (err) {
            if (err) {
                return res.end("Error uploading file.");
            }
            res.end("File is uploaded");
        })
    })

    app.post('/upload/delete', async function (req, res) {
        try {
            const fs = require('fs');
            console.log(req.body.filename)
            fs.unlink(process.cwd() + '/public/uploads/' + req.body.filename,
                (err) => {
                    if (err) throw err;
                    res.send("Delete sucessful")
                    // console.log('successfully deleted material file');
                });
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to delete file the material'
            })
        }
    })
}
