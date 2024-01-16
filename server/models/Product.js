const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  productCode: {
    type:String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
    default: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  brand:{
   type:String,
  },
  price: {
    type: Number,
    require: true,
  },
  rate: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    require: true,
  },
  imgUrl: [String],
  createAt: {
    type: Date,
    default: Date.now 
  }
});

productSchema.pre("save", async function (next) {
  if (!this.productCode) {
    const highestProduct = await this.constructor.findOne({}, { productCode: 1 }, { sort: { productCode: -1 } });

    if (highestProduct) {
      const lastProductCode = highestProduct.productCode;
      const lastNumber = parseInt(lastProductCode.substr(2), 10);
      this.productCode = `SP${lastNumber + 1}`;
    } else {
      this.productCode = "SP1";
    }
  }
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;