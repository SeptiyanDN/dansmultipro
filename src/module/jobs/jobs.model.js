const mongoose = require('mongoose')
const jobschema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    creator:{
        type: mongoose.Types.ObjectId,
        ref: 'Users',
    }
},
{
    timestamps: true
})

const jobs = mongoose.model('jobs', jobschema)
module.exports = jobs