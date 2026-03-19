const express = require("express");
const verifyAdminToken = require("../middleware/verifyAdminToken");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  postABanner,
  getAllBanners,
  deleteABanner,
} = require("./banner.controller");

router.post(
  "/create-banner",
  verifyAdminToken,
  upload.fields([{ name: "bannerImage", maxCount: 1 }]),
  postABanner,
);

//Get all banners
router.get("/", getAllBanners);

//Delete a banner
router.delete("/:id", verifyAdminToken, deleteABanner);

module.exports = router;
