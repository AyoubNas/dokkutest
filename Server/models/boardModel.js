const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

const BoardSchema = new Schema({
  title: {
    type: String,
    required : true,
    index: true,
    unique: true
  },
  visibility: {
    type: String,
    enum: ['Public','Private','Team']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isArchived: {
    type: Boolean,
    default: false
  },
  lists: [{
    type: Schema.Types.ObjectId, 
    ref: 'Lists'
  }]
})

BoardSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Boards', BoardSchema)