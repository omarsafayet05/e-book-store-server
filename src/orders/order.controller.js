const Order = require("./order.model");

const postAOrder = async (req, res) => {
  try {
    const newOrder = await Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(200).json("order created succesfully!", savedOrder);
  } catch (error) {
    console.error("Error creating order", error);
    res.status(500).send({ message: "Creating a order! " });
  }
};

const getOrderByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const orders = await Order.find({ email }).sort({ createdAt: -1 });
    if (!orders) {
      return res.status(404).json("Order not found!");
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders", error);
    res.status(500).send({ message: "Failed to fetch orders" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).send(orders);
  } catch (error) {
    console.error("Error fetching all orders", error);
    res.status(500).send({ message: "Failed to fetch all orders" });
  }
};

const deleteAOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const orderDelete = await Order.findByIdAndDelete(id);
    if (!orderDelete) {
      res.status(404).send({ message: "Order is not found!" });
    }

    res.status(200).send({
      message: "order deleted succesfully",
      order: orderDelete,
    });
  } catch (error) {
    console.error("Error delete order", error);
    res.status(500).send({ message: "Failed to delete a order" });
  }
};

module.exports = {
  postAOrder,
  getOrderByEmail,
  getAllOrders,
  deleteAOrder,
};
