const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/free',{ useUnifiedTopology: true, useNewUrlParser: true })

const users = mongoose.model('users',{
    username:String,
    password:String
})



module.exports = {users}