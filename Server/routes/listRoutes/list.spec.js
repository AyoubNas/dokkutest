const mongoose = require('mongoose')
const List = mongoose.model('Lists')
const Board = mongoose.model('Boards')

module.exports = (chai,server) => {
    describe('Lists', () => {
        beforeEach((done) => {
            Board.remove({}, () => {
                List.remove({}, () => done())
            })
            
        })

        describe('/POST board/:board_id/lists', () => {
            it('it should POST a new list', (done) => {
              const boardTest = new Board({title: "Test Board", visibility: "Private"})
              boardTest.save((err,board) =>{
                const listTest = {title: "Test list"}
                
                chai.request(server)
                .post(`${server.APIROOTPATH}/boards/${board.id}/lists`)
                .send(listTest)
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.be.a('object')
                    done()
                })
              })
            })

            it('it should not POST a new list (missing title)', (done) => {
                const boardTest = new Board({title: "Test Board", visibility: "Private"})

                boardTest.save(function(err,board){
                    const listFailed = {}
                    chai.request(server)
                        .post(`${server.APIROOTPATH}/boards/${board.id}/lists`)
                        .send(listFailed)
                        .end((err, res) => {
                            res.should.have.status(400)
                            res.body.should.be.a('object')
                            done()
                        })
                })
            })

            it('it should not POST a new list (board does not exist)', (done) => {
                const listFailed = {title: "Test list"}  

                chai.request(server)
                    .post(`${server.APIROOTPATH}/boards/ggjgj8788hg27sjhh793y/lists`)
                    .send(listFailed)
                    .end((err, res) => {
                        res.should.have.status(400)
                        res.body.should.be.a('object')
                        done()
                    })
            })

        })

        describe('/PUT boards/:board_id/lists/:list_id', () => {
            it('it should UPDATE a list', (done) => {
                const boardTest = new Board({title: "Test Board", visibility: "Private"})

                boardTest.save((err,board) => {
                    const listTest = new List({title: "Test List"})

                    listTest.save(board.id,(err,list) =>{

                        Board.findOneAndUpdate({_id: board.id}, {$push: {lists: list.id}},{new: true}).exec((err,b)=>{
                            const listUpdated = {title: "Test List 2"}

                            chai.request(server)
                            .put(`${server.APIROOTPATH}/boards/${board.id}/lists/${list.id}`)
                            .send(listUpdated)
                            .end((err, res) => {
                                res.should.have.status(200)
                                res.body.should.be.a('object')
                                done()
                            })
                        })
                    })
                })
            })

            it('it should NOT UPDATE a list (list id does not exist)', (done) => {
                const boardTest = new Board({title: "Test Board", visibility: "Private"})

                boardTest.save((err,board) => {
                    const listTest = new List({title: "Test List"})

                    listTest.save(board.id,(err,list) => {

                        Board.findOneAndUpdate({_id: board.id}, {$push: {lists: list.id}},{new: true}).exec((err,b) => {
                            const listUpdated = new List({title: "Updated List"})
                            chai.request(server)
                            .put(`${server.APIROOTPATH}/boards/${board.id}/lists/ggjgj8788hg27sjhh793y`)
                            .send(listUpdated)
                            .end((err, res) => {
                                res.should.have.status(400)
                                res.body.should.be.a('object')
                                done()
                            })
                        })
                    })
                })
            })

            it('it should NOT UPDATE a list (board id does not match)', (done) => {
                const boardTest = new Board({title: "Test Board", visibility: "Private"})

                boardTest.save((err,board) => {
                    const listTest = new List({title: "Test List"})

                    listTest.save(board.id,(err,list) => {
                        const listTest2 = new List({title: "Test List 2"})

                        listTest2.save(board.id,(err,list2) => {
                            Board.findOneAndUpdate({_id: board.id}, {$push: {lists: list.id}},{new: true}).exec((err,board) => {
                                const listUpdated = new List({title: "Updated List"})
                                chai.request(server)
                                .put(`${server.APIROOTPATH}/boards/${board.id}/lists/${list2.id}`)
                                .send(listUpdated)
                                .end((err, res) => {
                                    res.should.have.status(400)
                                    res.body.should.be.a('object')
                                    done()
                                })
                            })
                        })
                        
                    })
                })
            })

        })

        describe('/PUT boards/:board_id/lists/:list_id/move', () => {
            it('it should MOVE a list to a position', (done) => {
                const boardTest = new Board({title: "Test Board", visibility: "Private"})
                
                boardTest.save((err,board) => {
                    const listTest = new List({title: "Test List"})
                    
                    listTest.save(board.id,(err,list) => {
                        Board.findOneAndUpdate({_id: board.id}, {$push: {lists: list.id}},{new: true}).exec((err,b) => {
                            const listTest2 = new List({title: "Test List 2"})
                            
                            listTest2.save(board.id,(err,list2) => {
                                Board.findOneAndUpdate({_id: board.id}, {$push: {lists: list2.id}},{new: true}).exec((err,b) => {
                                    const pos = {position: 1}
                                    chai.request(server)
                                    .put(`${server.APIROOTPATH}/boards/${board.id}/lists/${list.id}/move`)
                                    .send(pos)
                                    .end((err, res) => {
                                        res.should.have.status(200)
                                        res.body.should.be.a('array')
                                        res.body[0].should.have.property('_id').eql(list2.id)
                                        done()
                                    })
                                })
                            })
                        })
                    })
                })
            })

            it('it should NOT MOVE a list to a position (wrong position)', (done) => {
                const boardTest = new Board({title: "Test Board", visibility: "Private"})
                
                boardTest.save((err,board) => {
                    const listTest = new List({title: "Test List"})
                    
                    listTest.save(board.id,(err,list) => {
                        Board.findOneAndUpdate({_id: board.id}, {$push: {lists: list.id}},{new: true}).exec((err,b) => {
                            const listTest2 = new List({title: "Test List 2"})
                            
                            listTest2.save(board.id,(err,list2) => {
                                Board.findOneAndUpdate({_id: board.id}, {$push: {lists: list2.id}},{new: true}).exec((err,b) => {
                                    const pos = {position: 2}
                                    chai.request(server)
                                    .put(`${server.APIROOTPATH}/boards/${board.id}/lists/${list.id}/move`)
                                    .send(pos)
                                    .end((err, res) => {
                                        res.should.have.status(400)
                                        res.body.should.be.a('object')
                                        done()
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })

        describe('/DELETE boards/:board_id/lists/:list_id', () => {
            it('it should DELETE a list', (done) => {
                const boardTest = new Board({title: "Test Board", visibility: "Private"})

                boardTest.save((err,board) => {
                    const listTest = new List({title: "Test List"})

                    listTest.save(board.id,(err,list) => {

                        Board.findOneAndUpdate({_id: board.id}, {$push: {lists: list.id}},{new: true}).exec((err,b) => {
                            chai.request(server)
                                .delete(`${server.APIROOTPATH}/boards/${board.id}/lists/${list.id}`)
                                .end((err, res) => {
                                    res.should.have.status(200)
                                    res.body.should.be.a('object')
                                    done()
                                })
                        })
                    })
                })
            })

            it('it should NOT DELETE a list (list id does not exist)', (done) => {
                const boardTest = new Board({title: "Test Board", visibility: "Private"})

                boardTest.save((err,board) => {
                    const listTest = new List({title: "Test List"})

                    listTest.save(board.id,(err,list) => {

                        Board.findOneAndUpdate({_id: board.id}, {$push: {lists: list.id}},{new: true}).exec((err,b) => {
                            chai.request(server)
                            .delete(`${server.APIROOTPATH}/boards/${board.id}/lists/ggjgj8788hg27sjhh793y`)
                            .end((err, res) => {
                                res.should.have.status(400)
                                res.body.should.be.a('object')
                                done()
                            })
                        })
                    })
                })
            })

            it('it should NOT DELETE a list (board id does not match)', (done) => {
                const boardTest = new Board({title: "Test Board", visibility: "Private"})

                boardTest.save((err,board) => {
                    const listTest = new List({title: "Test List"})

                    listTest.save(board.id,(err,list) => {
                        const listTest2 = new List({title: "Test List 2"})

                        listTest2.save(board.id,(err,list2) => {
                            Board.findOneAndUpdate({_id: board.id}, {$push: {lists: list.id}},{new: true}).exec((err,b) => {
                                chai.request(server)
                                .delete(`${server.APIROOTPATH}/boards/${board.id}/lists/${list2.id}`)
                                .end((err, res) => {
                                    res.should.have.status(400)
                                    res.body.should.be.a('object')
                                    done()
                                })
                            })
                        })
                        
                    })
                })
            })
        })
    })

    
}
