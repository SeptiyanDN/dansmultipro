const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username : {
        type: 'string',
        required: true,
        unique: true
    },
    full_name : {
        type: 'string',
        required: true,
    },
    password : {
        type: 'string',
        required: true
    },
    
}, {
    timestamps: true
})
const Users = mongoose.model("Users", userSchema)
module.exports = Users