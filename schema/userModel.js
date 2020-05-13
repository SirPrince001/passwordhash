const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const users = new Schema({
    userName: String,
    password : String
})


// users.methods.comparePassword = function(plaintext, callback) {
//     return callback(null, Bcrypt.compareSync(plaintext, this.password));
// };

module.exports = mongoose.model('User', users)