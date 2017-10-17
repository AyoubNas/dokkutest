
const express = require('express')
const router = express.Router()


// Importing all routes
require('./boardRoutes')(router)
require('./listRoutes')(router)

// Main routes
router.get('/', (req, res) => {
    res.status(200).send("API is working")
})

module.exports = router
