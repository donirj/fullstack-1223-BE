//1 imports
const mongoose = require("mongoose")

//2 schema
const charactersSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    }, 
    pictureUrl: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String
    },
    isAlive: {
        type: Boolean,
        required: true,
        default: false
    },
    description: {
        type: String,
        required: true
    }
})

//3 model
const Character = mongoose.model("Character", charactersSchema)

//4 exports
module.exports = Character