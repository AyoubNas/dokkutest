const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')
const swaggerJSDoc = require('swagger-jsdoc')

//created model loading here
const Models = require('./models/index') 

if(process.env.NODE_ENV=="test")
    app.db_host = "mongodb://localhost/Prello_test"
else
    app.db_host = "mongodb://localhost/Prello"

// mongoose instance connection url connection
mongoose.Promise = Promise

// mongodb connection
mongoose.connect(app.db_host, {
  useMongoClient: true,
  promiseLibrary: global.Promise
})

const db = mongoose.connection

// mongodb error
db.on('error', console.error.bind(console, 'connection error:'))

// mongodb connection open
db.once('open', () => {
    if(process.env.NODE_ENV!="test")
        console.log(`Connected to Mongo at: ${new Date()}`)
})

//set app port
app.APIROOTPATH = '/api'
app.set('port', port)

app.use(bodyParser.json())

//load the routes
app.use(app.APIROOTPATH, require('./routes/'))

// Swagger.io doc
app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
})

// swagger definition
const swaggerDefinition = {
    info: {
      title: 'Prello API',
      version: '0.0.1',
      description: 'REST API For Prello App',
    },
    host: 'localhost:3000',
    basePath: app.APIROOTPATH,
}
  
// options for the swagger docs
const options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./routes/**/*.js'],
}
  
// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options)

// Serving doc files
app.use('/doc', express.static(path.join(__dirname,'/swagger')))

app.all('/*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type,Accept,X-Access-Token,Authorization')
    if (req.method == 'OPTIONS')
        res.status(200).end()
    else
        next()
})

app.use((req, res) =>
    res.status(404).send({
        status: 404,
        message: "Not found !"
    })
)

//server start listen
const server = app.listen(app.get('port'), () =>{
    if(process.env.NODE_ENV!="test")
        console.log(`RESTful API server started on port ${server.address().port}`)
})

module.exports = app