const Transactions = require("./transaction.model");

const postAzinipayTxn = async (req, res) => {
  try {
    const {
      txn_status,
      order_id,
      invoice_id,
      transaction_id,
      cus_name,
      email,
      payment_method,
      amount,
      sender_number,
    } = req.body;
    const existingTxn = await Transactions.findOne({ invoice_id });
    if (existingTxn) {
      return res.status(200).json({ message: "Transaction already stored!" });
    }
    const newTransaction = await Transactions.create({
      order_id,
      invoice_id,
      transaction_id,
      cus_name,
      email,
      payment_method,
      sender_number,
      txn_status,
      amount,
    });
    res.status(201).json("Post a transaction successfully!", newTransaction);
  } catch (error) {
    console.error("Creating error in a post transaction!", error);
    res.status(500).json({ message: "Failed to create a transaction!" });
  }
};

const getZinipayTxnByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const transactions = await Transactions.find({ email }).sort({
      createdAt: -1,
    });
    if (!transactions) {
      return res.status(404).json("Transactions are not found!");
    }
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions!", error);
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
};

const getAllZinipayTxn = async (req, res) => {
  try {
    const transactions = await Transactions.find().sort({ createdAt: -1 });
    res.status(200).send(transactions);
  } catch (error) {
    console.error("Error fetching all Transactions", error);
    res.status(500).send({ message: "Failed to fetch all Transactions" });
  }
};
module.exports = { postAzinipayTxn, getZinipayTxnByEmail, getAllZinipayTxn };
