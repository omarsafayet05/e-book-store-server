const express = require("express");
const User = require("./user.model");
const router = express.Router();
var jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET_KEY;

router.post("/admin", async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await User.findOne({ username });
    if (!admin) {
      res.status(404).send({ message: "Admin not found" });
    }
    if (admin.password !== password) {
      res.status(401).send({ message: "Password invalid!" });
    }
    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).send({
      message: "Authentication successfull",
      token: token,
      user: {
        username: admin.username,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Failed to login as admin", error);
    res.status(401).send({ message: "Failed to login as admin" });
  }
});

//get admin login info
router.get("/", async (req, res) => {
  const admin = await User.find();
  res.status(200).send({ message: "admin info found", admin });
  try {
  } catch (error) {
    console.error("Error fetching admin login info", error);
    res.status(500).send({ message: "Failed to fetch admin login info " });
  }
});

//update admin login info
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const adminUpdate = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!adminUpdate) {
      res.status(404).send({ message: "admin is not found!" });
      res.status(200).send({
        message: "admin login updated succesfully",
        admin: adminUpdate,
      });
    }
  } catch (error) {
    console.error("Error update admin info", error);
    res.status(500).send({ message: "Failed to update admin info" });
  }
});
module.exports = router;
