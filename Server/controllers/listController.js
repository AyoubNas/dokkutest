const mongoose = require('mongoose')
const move = require('array.prototype.move')
const util = require('./util')
const Board = mongoose.model('Boards')
const List = mongoose.model('Lists')


exports.create_list = (req, res) => {
  const new_list = new List(req.body)
  
  new_list.save(req.params.board_id)
  .then((list) => {
    Board.update({_id: req.params.board_id}, {$push: {lists: list}}, (err) => {
      if(err)
        res.status(400).send({
          status: "400",
          message: err.message
        })
      else
        res.status(201).send(list)
    })
  },(err) =>
    res.status(400).send({
      status: "400",
      message: err.message
    })
  )
}

exports.update_list = (req, res) => {
  util.checkObjectReferences({id: req.params.board_id, model: "board"},{id: req.params.list_id, column: "lists"})
  .then(function(done){
    return List.findOneAndUpdate({_id: req.params.list_id}, req.body, {new: true}).exec()
  },function(err){
    res.status(400).send({
      status: "400",
      message: err.message
    })
  })
  .then((list) =>
    res.status(200).send(list)
  ,(err) =>
    res.status(400).send({
      status: "400",
      message: err.message
    })
  )
}

exports.delete_list = (req, res) => {
  util.checkObjectReferences({id: req.params.board_id, model: "board"},{id: req.params.list_id, column: "lists"})
  .then(function(done){
      return Board.update({_id: req.params.board_id}, {$pull: {lists: req.params.list_id}})
  },(err) =>
    res.status(400).send({
      status: "400",
      message: err.message
    })
  )
  .then(() => {
      List.remove({_id: req.params.list_id}).exec((err) => {
        if(err)
        res.status(400).send({
          status: "400",
          message: err.message
        })
        else
        res.status(200).send({ 
          status: '200', 
          message: 'List successfully deleted' 
        })
      })
  },(err) =>
    res.status(400).send({
      status: "400",
      message: err.message
    })
  )
}

exports.move_list = (req, res) => {
  Board.findById(req.params.board_id).exec()
  .then((board)=>{
    const oldLists = board.lists
    if(oldLists.length==0)
      res.status(400).send({
        status: "400",
        message: "Board object does not contain list objects"
      })
    else{
      const indexOld = oldLists.indexOf(req.params.list_id)
      if(indexOld==-1)
        res.status(400).send({
          status: "400",
          message: "Board object does not contain the list to move"
        })
      else{
        if(req.body.position>=oldLists.length)
          res.status(400).send({
            status: "400",
            message: "Board object does not contain list objects"
          })
        else{
          oldLists.move(indexOld,req.body.position)
          Board.findOneAndUpdate({_id: req.params.board_id}, {lists: oldLists}, {new: true}).exec()
          .then((board) => {
            return Board.findById(board.id).populate('lists').exec()
          },(err) => {
            res.status(400).send({
              status: "400",
              message: err.message
            })
          })
          .then((board) => {
            res.status(200).send(board.lists)
          },(err) => {
            res.status(400).send({
              status: "400",
              message: err.message
            })
          })
        }
      } 
    }
  }
  ,(err) =>
    res.status(400).send({
      status: "400",
      message: err.message
    })
  )
}