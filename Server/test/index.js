process.env.NODE_ENV = 'test'

//Require the dev-dependencies
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
const should = chai.should()

chai.use(chaiHttp)


// Import global test file
require('../routes/test.spec')(chai,server)
