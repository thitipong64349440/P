let express = require('express')
let bodyParser = require('body-parser')
let cors = require('cors')
// const multer = require('multer')
const { sequelize } = require('./models')
const config = require('./config/config')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use('/assets', express.static('public')) 

require('./userPassport')
require('./routes')(app)

let port = process.env.PORT || config.port

sequelize.sync({ force: false }).then(() => {
    app.listen(port, function () {
        console.log('Server running on ' + port)
    })
})
