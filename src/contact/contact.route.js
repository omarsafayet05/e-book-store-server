const express = require("express");
const postAContactMail = require("./contact.controller");
const router = express.Router();

router.post("/", postAContactMail);
module.exports = router;
