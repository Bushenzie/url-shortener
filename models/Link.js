const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
    url: {
        type: String,
        required: [true,"Must provide original link"]
    },
    shortenedID: {
        type: String,
        default: "",
    }
})

module.exports = mongoose.model("Link",linkSchema);
