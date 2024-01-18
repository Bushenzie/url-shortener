const express = require("express");
const router = express.Router();
const { createLink, getLink } = require("../controllers/links") 

router.get("/:id",getLink);
router.post("/",createLink);

module.exports = router;