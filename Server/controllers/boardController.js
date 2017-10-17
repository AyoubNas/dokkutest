const mongoose = require('mongoose')
const Board = mongoose.model('Boards')


exports.get_all_boards = (req, res) => {
  Board.find({}).exec()
  .then((board) => {
    res.status(200).send(board)
  },(err) =>
    res.status(400).send({
      status: "400",
      message: err.message
    })
  )
}


exports.create_board = (req, res) => {
  const new_board = new Board(req.body)

  new_board.save()
  .then((board) =>
    res.status(201).send(board)
  ,(err) =>
    res.status(400).send({
      status: "400",
      message: err.message
    })
  )
}


exports.get_one_board = (req, res) => {
  Board.findById(req.params.board_id).populate('lists').exec()
  .then((board) => {
      if(board)
        res.status(200).send(board)
      else
        res.status(400).send({
          status: "400",
          message: err.message
        })
  },(err) =>
    res.status(400).send({
      status: "400",
      message: err.message
    })
  )
}


exports.update_board = (req, res) => {
  Board.findOneAndUpdate({_id: req.params.board_id}, req.body, {new: true})
  .then((board) => {
    res.status(200).send(board)
  },(err) => {
    res.status(400).send({
      status: "400",
      message: err.message
    })
  })
}


exports.delete_board = (req, res) => {
  Board.findOneAndRemove({_id: req.params.board_id}).exec()
  .then((board) =>
    res.status(200).send({ 
      status: "200", 
      message: "Board successfully deleted"
    })
  ,(err) =>
    res.status(400).send({
      status: "400",
      message: err.message
    })
  )
}

