//calling mongoose
const mongoose = require("mongoose");


//creating the pinschema
const PinSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    title: {
        type: String,
        require: true,
        min: 3
    },
    desc: {
        type: String,
        require: true,
        min: 3,
    },
    rating: {
        type: Number,
        require: true,
        min: 0,
        max: 5,
    },
    lat: {
        type: Number,
        require: true,
    },
    long: {
        type: Number,
        require: true,
    }
}, { timestamps: true });

//exporting the model
module.exports = mongoose.model("Pin", PinSchema)