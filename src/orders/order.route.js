const express = require("express");
const {
  postAOrder,
  getOrderByEmail,
  getAllOrders,
  deleteAOrder,
} = require("./order.controller");
const verifyAdminToken = require("../middleware/verifyAdminToken");
const router = express.Router();

//create a order endpoint
router.post("/", postAOrder);

//get orders by email
router.get("/email/:email", getOrderByEmail);

//get all orders
router.get("/", verifyAdminToken, getAllOrders);

//delete a order
router.delete("/:id", verifyAdminToken, deleteAOrder);

module.exports = router;
