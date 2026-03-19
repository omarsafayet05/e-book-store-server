const express = require("express");

const {
  postABook,
  getAllBooks,
  getSingleBook,
  updateABook,
  deleteABook,
} = require("./book.controller");
const verifyAdminToken = require("../middleware/verifyAdminToken");
const router = express.Router();
const upload = require("../middleware/upload");

//frontend=>backend server=>controller=>book schema=>database=>send to server=>back to the frontend

//Post a book
router.post(
  "/create-book",

  verifyAdminToken,

  upload.fields([{ name: "coverImage", maxCount: 1 }]),

  postABook,
);

//Get all books
router.get("/", getAllBooks);

//Get Single book
router.get("/:id", getSingleBook);

//update a book
router.put(
  "/edit/:id",
  verifyAdminToken,
  upload.fields([{ name: "coverImage", maxCount: 1 }]),
  updateABook,
);

//delete a book
router.delete("/:id", verifyAdminToken, deleteABook);

module.exports = router;
