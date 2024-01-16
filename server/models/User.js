const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema({
  userCode: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  sex: {
    type: String,
    default: "Nam",
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  note:{
    type: String,
  },
  phoneNumber: {
    type: String,
    require: true,
  },
  wishList: [String],
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});
// Login
userSchema.methods.matchPassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

// Register
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  if (!this.userCode) {
    const highestProduct = await this.constructor.findOne(
      {},
      { userCode: 1 },
      { sort: { userCode: -1 } }
    );

    if (highestProduct) {
      const lastuserCode = highestProduct.userCode;
      const lastNumber = parseInt(lastuserCode.substr(2), 10);
      this.userCode = `SP${lastNumber + 1}`;
    } else {
      this.userCode = "SP1";
    }
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
