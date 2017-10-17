const mongoose = require('mongoose')
const models = {board: mongoose.model('Boards'),list: mongoose.model('Lists')}

exports.checkObjectReferences = (parent,child) => {
    return new Promise((fulfill,reject) => {
        models[parent.model].findById(parent.id).populate({
          path: child.column,
          match: {_id: child.id}
        }).exec((err,done) => {
          if(err)
            reject(new Error(`id: ${child.id} doest match with a reference in ${child.column} collection of the ${parent.model} with id: ${parent.id}`))
          else
            if(done)
              if(done.lists.length>0)
                fulfill(done)
              else
                reject(new Error(`id: ${child.id} doest match with a reference in ${child.column} collection of the ${parent.model} with id: ${parent.id}`))
            else
              reject(new Error(`id: ${child.id} doest match with a reference in ${child.column} collection of the ${parent.model} with id: ${parent.id}`))
        })
    })
}