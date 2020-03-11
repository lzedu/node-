const {users} = require('../utils/db')

const signup = function(data){
    const user = new users(data)
    return user.save()
} 

const findOne = function(condition){
    return users.findOne(condition)
}

module.exports = {
    signup,
    findOne
}