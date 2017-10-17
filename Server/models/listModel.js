const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ListSchema = new Schema({
  title: {
    type: String,
    required : true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isArchived: {
    type: Boolean,
    default: false
  }
})

ListSchema.pre('save', function(next, board_id) {
  this.model('Boards').find({_id: board_id}).exec()
  .then((board) => {
    if(board.length>0)
      next(board)
    else
      next(new Error("Board object does not exist"))
  },(err) => next(new Error("Board object does not exist")))
})

module.exports = mongoose.model('Lists', ListSchema)