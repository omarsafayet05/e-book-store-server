const express = require("express");
//import express from "express";
const app = express();
const cors = require("cors");
//import cors from "cors";
//import dotenv from "dotenv";
const mongoose = require("mongoose");
//import mongoose from "mongoose";
const port = process.env.PORT || 5000;
require("dotenv").config();
//dotenv.config();

//import contactRoutes from "./src/contact/contact.route.js";

//middleware
app.use(express.json({ limit: "250mb" }));
app.use(express.urlencoded({ limit: "250mb", extended: true }));
// app.use((req, res, next) => {
//   req.setTimeout(60 * 60 * 1000);
//   res.setTimeout(60 * 60 * 1000);
//   next();
// });

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);

// app.use(
//   cors({
//     origin: ["https://riqacademy.com"],
//     credentials: true,
//   }),
// );

const main = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      serverSelectionTimeoutMS: 5000,
      retryWrites: true,
    });

    console.log("mongodb is connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed");
    process.exit(1);
  }

  app.get("/", (req, res) => {
    res.send("Welcome to E-book store server!");
  });
};

main();
// main()
//   .then(() => console.log("mongodb is connected successfully"))
//   .catch((err) => console.log(err));

//Routes
const bookRoutes = require("./src/books/book.route");
const orderRoutes = require("./src/orders/order.route");
const contactRoutes = require("./src/contact/contact.route");
const userRoutes = require("./src/users/user.route");
const adminRoutes = require("./src/stats/admin.stats");
const bannerRoutes = require("./src/banners/banner.route");
const newsletterRoutes = require("./src/newsletter/newsletter.route");
const transactionsRoutes = require("./src/Transactions/transaction.route");
// ---------------------------------------------------------
app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/zinipay-txn-info", transactionsRoutes);

app.listen(port, () => {
  console.log(`E-book store app listening on port ${port}`);
});
