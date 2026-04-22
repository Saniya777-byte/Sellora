const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  try {

    const { orderItems } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    const totalPrice = orderItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      user: req.user._id,
      orderItems,
      totalPrice
    });

    res.status(201).json(order);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getMyOrders = async (req, res) => {

  const orders = await Order.find({ user: req.user._id })
    .populate("orderItems.product");

  res.json(orders);
};


exports.getAllOrders = async (req, res) => {

  const orders = await Order.find()
    .populate("user", "name email")
    .populate("orderItems.product");

  res.json(orders);
};


exports.updateOrderStatus = async (req, res) => {

  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  order.status = req.body.status || order.status;

  const updatedOrder = await order.save();

  res.json(updatedOrder);
};
