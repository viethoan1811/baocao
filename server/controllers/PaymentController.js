const Payment = require("../models/Payment");
const Joi = require("joi");

const createPayment = async (req, res, next) => {
  try {
    const schema = Joi.object({
      type: Joi.string().valid("paypal", "cash"),
      userId: Joi.string().required(),
      orderId: Joi.string().required(),
      status: Joi.string().valid("success", "error", "cancel"),
      money: Joi.number().required(),
    });
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const newPayment = new Payment(req.body);
    const savedPayment = await newPayment.save();
    return res.status(201).json(savedPayment);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
const getPaymentById = async (req, res, next) => {
  try {
    const PaymentId = req.params.id;

    const data = await Payment.findById(PaymentId);
    if (!data) {
      return res.status(404).json({ error: "Payment not found" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Internal server error" });
  }
};
const getAllPayment = async (req, res, next) => {
  try {
    const Payments = await Payment.find()
      .sort({ createdAt: -1 })
      .populate("userId", "nameUser");
    return res.status(200).json(Payments);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Internal server error" });
  }
};

const updatePayment = async (req, res, next) => {
  try {
    const PaymentId = req.params.id;

    const schema = Joi.object({
      type: Joi.string().valid("paypal", "cash"),
      userId: Joi.string().required(),
      orderId: Joi.string().required().min(0),
      status: Joi.string().valid("success", "error", "cancel"),
      money: Joi.number().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const updatedPayment = await Payment.findByIdAndUpdate(
      PaymentId,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedPayment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    return res.status(200).json(updatedPayment);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
const deletePayment = async (req, res, next) => {
  try {
    const PaymentId = req.params.id;

    const deletedPayment = await Payment.findByIdAndRemove(PaymentId);

    if (!deletedPayment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    return res.status(200).json({ message: "Payment deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
const getPaymentByUser = async (req, res, next) => {
  try {
    const { idUser } = req.params;
    const data = await Payment.find({ userId: idUser });
    if (data) {
      return res.jon(data);
    } else {
      return res.json([]);
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createPayment,
  getPaymentById,
  getAllPayment,
  updatePayment,
  deletePayment,
  getPaymentByUser
};
