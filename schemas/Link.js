const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const linkSchema = new mongoose.Schema({
    originalLink: {
        type: String,
        required: [true,"Must provide original link"]
    },
    shortenedID: {
        type: String,
        default: "",
    }
})

linkSchema.methods.GenShortenedID = async function() {
    const randomBytes = await bcryptjs.randomBytes(6);
    this.shortenedID = randomBytes;
}

module.exports = mongoose.model("Link",linkSchema);
