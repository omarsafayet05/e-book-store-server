const { default: mongoose } = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    trending: { type: Boolean, required: true },
    recommended: { type: Boolean, required: true },
    coverImg: {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    },

    pdf: { type: String, required: true },
    oldPrice: { type: Number, required: true },
    newPrice: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
