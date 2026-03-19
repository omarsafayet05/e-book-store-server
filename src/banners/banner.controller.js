const uploadBuffer = require("../utils/cloudUpload");
const Banner = require("./banner.model");
const cloudinary = require("../utils/cloudinary");

const postABanner = async (req, res) => {
  try {
    let bannerImageUrl = null;

    //upload image to cloudinary
    if (req.files && req.files.bannerImage) {
      const imageBuffer = req.files.bannerImage[0].buffer;
      bannerImageUrl = await uploadBuffer(
        imageBuffer,
        "banner_images",
        "image",
      );
    }
    const newBanner = await Banner.create({
      bannerImg: {
        url: bannerImageUrl.secure_url,
        public_id: bannerImageUrl.public_id,
      },
    });
    res
      .status(200)
      .send({ message: "succesfully create a banner", banner: newBanner });
  } catch (error) {
    console.error("Failed creating a banner", error);
    res.status(500).send({ message: "Failed to create a banner" });
  }
};

const getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    res.status(200).send(banners);
  } catch (error) {
    console.error("Error fetching all banners", error);
    res.status(500).send({ message: "Failed to fetch all banners" });
  }
};

const deleteABanner = async (req, res) => {
  try {
    const { id } = req.params;
    const bannerDelete = await Banner.findByIdAndDelete(id);
    if (!bannerDelete) {
      res.status(404).send({ message: "Banner is not found!" });
    }

    //Delete image from cloudinary
    if (bannerDelete.bannerImg && bannerDelete.bannerImg.public_id) {
      await cloudinary.uploader.destroy(bannerDelete.bannerImg.public_id);
    }
    res.status(200).send({
      message: "banner deleted succesfully",
      banner: bannerDelete,
    });
  } catch (error) {
    console.error("Error delete banner", error);
    res.status(500).send({ message: "Failed to delete a banner" });
  }
};
module.exports = { postABanner, getAllBanners, deleteABanner };
