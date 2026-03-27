const { default: mongoose } = require("mongoose");

const txnSchema = new mongoose.Schema(
  {
    order_id: { type: String, required: true },
    txn_status: { type: String, required: true },
    cus_name: { type: String, required: true },
    email: { type: String, required: true },
    payment_method: { type: String, required: true },
    amount: { type: Number, required: true },
    invoice_id: { type: String, required: true, unique: true },
    transaction_id: { type: String, required: true, unique: true },
    sender_number: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const Transactions = mongoose.model("Transactions", txnSchema);

module.exports = Transactions;
