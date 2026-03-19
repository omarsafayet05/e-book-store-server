const { default: mongoose } = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    address: {
      city: { type: String, required: true },
      country: String,
      state: String,
      zipcode: String,
    },
    phone: {
      type: Number,
      required: true,
    },
    productIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
      },
    ],
    //N.B:when I will use schema from other(Such as "Book")schema for containing there contents in the parent schema.
    productCoverImages: [
      {
        type: mongoose.Schema.Types.String,
        ref: "Book",
        required: true,
      },
    ],
    productTitles: [
      {
        type: mongoose.Schema.Types.String,
        ref: "Book",
        required: true,
      },
    ],

    productDownloads: [
      {
        type: mongoose.Schema.Types.String,
        ref: "Book",
        required: true,
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
