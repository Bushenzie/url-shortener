const express = require("express");
const router = express.Router();
const { createLink, getLink,deleteLink, getAllLinks } = require("../controllers/links") 

router.get("/",getAllLinks);
router.post("/",createLink);
router.get("/:id",getLink);
router.delete("/:id",deleteLink);

module.exports = router;