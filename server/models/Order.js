const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  orderCode: {
    type: String,
    require: true,
  },
  products: [
    {
      idProduct: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        required: true,
        default: 0,
      },
      price: {
        type: Number,
        required: true,
        default: 0,
      },
    },
  ],
  totalQuantity: {
    type: Number,
    default: 0,
  },
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  local: {
    type: String,
    require: true,
  },
  note:{
    type: String,
    default: ""
  },
  numberPhone: {
    type: Number,
    require: true,
    default: "",
  },
  totalPrice: {
    type: Number,
    require: true,
    default: 0,
  },
  status: {
    type: Boolean,
    default: false
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

orderSchema.pre("save", async function (next) {
  if (!this.orderCode) {
    const highestProduct = await this.constructor.findOne(
      {},
      { orderCode: 1 },
      { sort: { orderCode: -1 } }
    );

    if (highestProduct) {
      const lastorderCode = highestProduct.orderCode;
      const lastNumber = parseInt(lastorderCode.substr(2), 10);
      this.orderCode = `OD${lastNumber + 1}`;
    } else {
      this.orderCode = "OD1";
    }
  }
  next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
