const { default: mongoose } = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    bannerImg: {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const Banner = mongoose.model("Banner", bannerSchema);
module.exports = Banner;
