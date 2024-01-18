const Link = require("../models/Link");
const validator = require("validator");
const crypto = require("crypto");
const {StatusCodes} = require("http-status-codes")

const LINK_ENCODING = "utf8";

async function createLink(req,res) {
    const { url } = req.body;
    if(!validator.isURL(url)) throw new Error("Wrong url provided");
    
    const searchedLink = await Link.findOne({url});
    if(searchedLink) throw new Error("Link already exists.");

    const randomBytes = await crypto.randomBytes(12).toString(LINK_ENCODING);
    const createdLink = await Link.create({url ,shortenedID: randomBytes});

    res.status(StatusCodes.CREATED).json({
        message: "OK",
        id: createdLink.shortenedID
    })
}

async function getLink(req,res) {
    const { id:linkId } = req.params;

    const searchedLink = await Link.findOne({shortenedID:linkId});

    if(!searchedLink) throw new Error("Link was not found");

    res.status(StatusCodes.OK).json({
        message: "OK",
        url: searchedLink.url
    })
}

async function deleteLink(req,res) {
    const { id:linkId } = req.params;

    const searchedLink = await Link.findOneAndDelete({shortenedID:linkId});

    if(!searchedLink) throw new Error("Link was not found");

    res.status(StatusCodes.OK).json({
        message: "OK",
        deletedLink: searchedLink
    })
}

module.exports = {
    createLink,
    getLink,
    deleteLink
}