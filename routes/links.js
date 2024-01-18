const express = require("express");
const router = express.Router();
const { createLink, getLink,deleteLink } = require("../controllers/links") 

router.post("/",createLink);
router.get("/:id",getLink);
router.delete("/:id",deleteLink);

module.exports = router;