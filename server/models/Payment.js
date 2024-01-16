const { ref } = require("joi");
const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
  paymentCode: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    enum: ["paypal", "cash"],
    require: true,
    default: "cash",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  createAt: {
    type: Date,
    default: Date.now, // Không có dấu ngoặc đơn ở đây
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
  status: {
    type: String,
    enum: ["success", "error", "cancel"],
    default: "success",
  },
  money:{
    type:Number,
    require:true,
    default:0
  }
});

paymentSchema.pre("save", async function (next) {
  if (!this.paymentCode) {
    const highestProduct = await this.constructor.findOne({}, { paymentCode: 1 }, { sort: { paymentCode: -1 } });

    if (highestProduct) {
      const lastpaymentCode = highestProduct.paymentCode;
      const lastNumber = parseInt(lastpaymentCode.substr(2), 10);
      this.paymentCode = `SP${lastNumber + 1}`;
    } else {
      this.paymentCode = "SP1";
    }
  }
  next();
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;