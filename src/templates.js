let httpTemplate = `require('dotenv/config')
const express = require('express')
const cors = require('cors')
const path = require('path')
const {connectDB} = require('./core/db')
const router = require('./routes')
const app = express()
var bodyParser = require('body-parser');
const formidable = require('express-formidable');

const PORT = process.env.PORT

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/media', express.static('media'))
app.use('/api', router)
app.enable('trust proxy')




app.listen(PORT, async () => {
    try {

        console.log("👍 Server Is Up And Running On Port ", PORT)


        await connectDB()
    } catch (error) {
        throw error
    }
})`

let httpsTemplate = `
require('dotenv/config')
const express = require('express')
const https = requre('https')
const cors = require('cors')
const path = require('path')
const {connectDB} = require('./core/db')
const router = require('./routes')
const app = express()
var bodyParser = require('body-parser');
const formidable = require('express-formidable');

const PORT = process.env.PORT

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/media', express.static('media'))
app.use('/api', router)
app.enable('trust proxy')




https.createServer(app).listen(PORT, async () => {
    try {

        console.log("👍 HTTPS Server Is Up And Running On Port ", PORT)


        await connectDB()
    } catch (error) {
        throw error
    }
})
`


module.exports = {
    httpTemplate,
    httpsTemplate
}