module.exports = (chai,server) => {
    require('./boardRoutes/board.spec')(chai,server)
    require('./listRoutes/list.spec')(chai,server)
}
