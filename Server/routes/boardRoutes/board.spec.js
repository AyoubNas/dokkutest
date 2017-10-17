const mongoose = require('mongoose')
const Board = mongoose.model('Boards')

module.exports = (chai,server) => {
    describe('Boards', () => {
        beforeEach((done) => {
            Board.remove({},() => done())
        })

        describe('/GET boards', () => {
            it('it should GET all the boards', (done) => {
              chai.request(server)
                  .get(`${server.APIROOTPATH}/boards`)
                  .end((err, res) => {
                      res.should.have.status(200)
                      res.body.should.be.a('array')
                    done()
                  })
            })
        })

        describe('/GET boards/:board_id', () => {
            it('it should GET a board related to the id', (done) => {
              const boardTest = new Board({title: "Test Board", visibility: "Private"})
  
              boardTest.save((err,board) => {
                chai.request(server)
                  .get(`${server.APIROOTPATH}/boards/${board.id}`)
                  .end((err, res) => {
                      res.should.have.status(200)
                      res.body.should.be.a('object')
                      res.body.should.have.property('_id').eql(board.id)
                    done()
                  })
              })
            })

            it('it should not GET a board (id does not match)', (done) => {
                const boardTest = new Board({title: "Test Board", visibility: "Private"})
    
                boardTest.save((err,board) => {
                  chai.request(server)
                    .get(`${server.APIROOTPATH}/boards/hjg373hg`)
                    .end((err, res) => {
                        res.should.have.status(400)
                        res.body.should.be.a('object')
                      done()
                    })
                })
            })
        })

        describe('/POST boards', () => {
            it('it should POST a new board', (done) => {
              const boardTest = {title: "Test Board", visibility: "Private"}
  
              chai.request(server)
                  .post(`${server.APIROOTPATH}/boards`)
                  .send(boardTest)
                  .end((err, res) => {
                      res.should.have.status(201)
                      res.body.should.be.a('object')
                    done()
                  })
            })

            it('it should not POST a new board (missing title)', (done) => {
                const boardTest = {visibility: "Private"}
    
                chai.request(server)
                    .post(`${server.APIROOTPATH}/boards`)
                    .send(boardTest)
                    .end((err, res) => {
                        res.should.have.status(400)
                        res.body.should.be.a('object')
                      done()
                    })
            })

            it('it should not POST a new board (title already existing)', (done) => {
                const boardTest = new Board({title: "Test Board", visibility: "Private"})
    
                boardTest.save((err,board) => {
                  const boardFailed = new Board({title: board.title, visibility: "Private"})  

                  chai.request(server)
                      .post(`${server.APIROOTPATH}/boards`)
                      .send(boardFailed)
                      .end((err, res) => {
                            res.should.have.status(400)
                            res.body.should.be.a('object')
                        done()
                      })
                })
            })

            it('it should not POST a new board (visibility not in enum)', (done) => {
                const boardTest = {title: "Test Board",visibility: "Test"}
    
                chai.request(server)
                    .post(`${server.APIROOTPATH}/boards`)
                    .send(boardTest)
                    .end((err, res) => {
                        res.should.have.status(400)
                        res.body.should.be.a('object')
                      done()
                    })
            })
        })

        describe('/PUT boards/:board_id', () => {
            it('it should UPDATE a board', (done) => {
                const boardTest = new Board({title: "Test Board", visibility: "Private"})
    
                boardTest.save((err,board) => {
                  const boardUpdated = {title: "Updated Board", visibility: "Public"}

                  chai.request(server)
                      .put(`${server.APIROOTPATH}/boards/${board.id}`)
                      .send(boardUpdated)
                      .end((err, res) => {
                            res.should.have.status(200)
                            res.body.should.be.a('object')
                        done()
                      })
                })
            })

            it('it should NOT UPDATE a board (id does not match)', (done) => {
                const boardTest = new Board({title: "Test Board", visibility: "Private"})
    
                boardTest.save((err,board) => {
                  const boardUpdated = new Board({title: "Updated Board", visibility: "Public"})  

                  chai.request(server)
                      .put(`${server.APIROOTPATH}/boards/fdf7bj`)
                      .send(boardUpdated)
                      .end((err, res) => {
                            res.should.have.status(400)
                            res.body.should.be.a('object')
                        done()
                      })
                })
            })

        })

        describe('/DELETE boards/:board_id', () => {
            it('it should DELETE a board', (done) => {
                const boardTest = new Board({title: "Test Board", visibility: "Private"})
    
                boardTest.save((err,board) => {
                  chai.request(server)
                      .delete(`${server.APIROOTPATH}/boards/${board.id}`)
                      .end((err, res) => {
                            res.should.have.status(200)
                            res.body.should.be.a('object')
                        done()
                      })
                })
            })

            it('it should NOT DELETE a board (id does not match)', (done) => {
                const boardTest = new Board({title: "Test Board", visibility: "Private"})
    
                boardTest.save((err,board) => {
                  chai.request(server)
                      .delete(`${server.APIROOTPATH}/boards/fgpf887m`)
                      .end((err, res) => {
                            res.should.have.status(400)
                            res.body.should.be.a('object')
                        done()
                      })
                })
            })
        })
    })

    
}
