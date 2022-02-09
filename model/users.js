var mongoose = require('mongoose')

var Schema = mongoose.Schema

const usersSchema = new Schema({
    name: {
        type:String
    },
    message: {
        type: String
    }
})

const usersModel = mongoose.model('users', usersSchema)
module.exports = usersModel