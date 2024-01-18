const Link = require("../schemas/Link");
const validator = require("express-validator");

async function createLink(req,res) {
    res.send("create link")
}

async function getLink(req,res) {
    res.send("get link")
}

module.exports = {
    createLink,
    getLink
}