const { default: mongoose } = require("mongoose");
const newsletterSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const Newsletter = mongoose.model("Newsletter", newsletterSchema);
module.exports = Newsletter;
