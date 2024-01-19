const Link = require("../models/Link");
const validator = require("validator");
const crypto = require("crypto");
const {StatusCodes} = require("http-status-codes")

const LINK_ENCODING = "hex";

async function createLink(req,res) {
    const { url } = req.body;
    if(!validator.isURL(url)) throw new Error("Wrong url provided");
    
    const searchedLink = await Link.findOne({url});
    if(searchedLink) return res.status(StatusCodes.OK).json({
        message: "Link already exists",
        id: searchedLink.shortenedID
    });

    const randomBytes = await crypto.randomBytes(8).toString(LINK_ENCODING);
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

async function getAllLinks(req,res) {
    const searchedLinks = await Link.find({});
    if(searchedLinks.length === 0) throw new Error("No links found");

    res.status(StatusCodes.OK).json({
        message: "OK",
        count: searchedLinks.length,
        links: searchedLinks
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
    getAllLinks,
    deleteLink
}