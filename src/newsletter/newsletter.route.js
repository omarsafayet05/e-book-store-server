const express = require("express");
const {
  postANewsletter,
  getAllNewsletter,
  deleteANewsletter,
} = require("./newsletter.controller");
const verifyAdminToken = require("../middleware/verifyAdminToken");

const router = express.Router();

router.post("/", postANewsletter);
router.get("/", getAllNewsletter);
router.delete("/:id", verifyAdminToken, deleteANewsletter);
module.exports = router;
