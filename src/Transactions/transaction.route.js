const express = require("express");
const {
  postAzinipayTxn,
  getZinipayTxnByEmail,
  getAllZinipayTxn,
} = require("./transaction.controller");
const verifyAdminToken = require("../middleware/verifyAdminToken");
const router = express.Router();
// Post a transaction
router.post("/", postAzinipayTxn);
//Get txn by email
router.get("/email/:email", getZinipayTxnByEmail);
//Get all txn
router.get("/", verifyAdminToken, getAllZinipayTxn);

module.exports = router;
