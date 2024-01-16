const Order = require("../models/Order");
const Product = require("../models/Product");
const Payment = require("../models/Payment");

const Joi = require("joi");

const createOrder = async (req, res, next) => {
  try {
    const schema = Joi.object({
      products: Joi.array().required(),
      idUser: Joi.string().required(),
      local: Joi.string().required(),
      numberPhone: Joi.number().required(),
      note: Joi.string()
    });
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { products } = req.body;
    let totalPrice = 0;
    let totalQuantity = 0;
    if (products && products.length > 0) {
      products.forEach((element) => {
        totalPrice += element.price * element.quantity;
        totalQuantity += element.quantity;
      });
    }
    const newOrder = new Order({ ...req.body, totalPrice, totalQuantity });
    const savedOrder = await newOrder.save();
    if(savedOrder){
      const newPayment = new Payment({
        userId: req.body.idUser,
        type: 'cash',
        orderId: savedOrder._id,
        money: totalPrice
      });
      await newPayment.save();
    }
    return res.status(201).json(savedOrder);
  } catch (error) {
    console.log("🚀 ~ file: OrderController.js:43 ~ createOrder ~ error:", error)
    return res.status(500).json({ error: "Internal server error" });
  }
};
const getOrderById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
const getAllOrder = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("idUser", "nameUser");
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
const updateOrder = async (req, res, next) => {
  try {
    const id = req.params.id;

    const schema = Joi.object({
      status: Joi.boolean(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    return res.status(200).json(updatedOrder);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
const deleteOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const deletedOrder = await Order.findByIdAndRemove(orderId);
    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
const getOrderByCode = async (req, res, next) => {
  try {
    const code = req.params.code;
    const order = await Order.findOne({ orderCode: code }).populate({
      path: "products.idProduct",
      select: "name productCode",
    });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    const { products, status } = order;
    const productsArray = products.map((item) => ({
      ...item.toObject(),
      status,
    }));
    return res.status(200).json(productsArray);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
const delteOrdeByCode = async (req, res, next) => {
  try {
    const code = req.params.code;
    const { productIdToRemove } = req.body;

    const order = await Order.findOneAndUpdate(
      { orderCode: code },
      {
        $pull: { products: { idProduct: productIdToRemove } },
        $inc: {
          totalPrice: -2000000,
          totalQuantity: -2,
        },
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: "Order or product not found" });
    }

    return res.status(200).json({ message: "Order updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
const getOrderByUser = async(req,res,next) =>{
  try {
    const id = req.params.id;
    const order = await Order.find({idUser: id});
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
const getDetailOrder = async(req,res,next) => {
  try {
    const id = req.params.id;
    const order = await Order.findOne({_id: id}).populate({
      path: "products.idProduct",
      select: "name productCode imgUrl brand",
    });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    const newData = {data:order.products, orderCode: order.orderCode};
    return res.status(200).json(newData);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  createOrder,
  getOrderById,
  getAllOrder,
  updateOrder,
  deleteOrder,
  getOrderByCode,
  delteOrdeByCode,
  getOrderByUser,
  getDetailOrder
};
