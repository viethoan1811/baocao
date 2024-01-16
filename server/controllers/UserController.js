const User = require("../models/User");
const Joi = require("joi");
const { generateToken, refreshToken } = require("../utils/generateToken");
const jwt = require("jsonwebtoken");
const randomstring = require("randomstring");
const nodemailer = require("nodemailer");

const register = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.email": "Email không hợp lệ",
        "any.required": "Email is required",
      }),
    password: Joi.string().min(8).required().messages({
      "string.pattern.base":
        "Password phải chứa chữ cái,số và 1 kí tự đặc biệt",
      "any.required": "Password is required",
    }),
    name: Joi.string().required().messages({
      "any.required": "Name is required",
    }),
    phone: Joi.string().min(10).max(12).required().messages({
      "string.pattern.base": "Phone chưa đúng dạng",
      "any.required": "Phone is required",
    }),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  try {
    const { email, password, name } = req.body;
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const user = await User.create({
      email,
      password,
      name,
    });

    if (user) {
      return res.status(201).json({
        message: "Success!",
      });
    } else {
      res.status(400).json({ message: "Invalid User Data" });
    }
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userCheck = await User.findOne({ email });
    if (userCheck && (await userCheck.matchPassword(password))) {
      const access_token = await generateToken({
        id: userCheck._id,
      });

      const refresh_token = await refreshToken({
        id: userCheck._id,
      });
      return res.json({
        status: "OK",
        message: "SUCESS",
        access_token,
        refresh_token,
      });
    } else {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }
  } catch (error) {
    next(error);
  }
};
const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      if (!user.isAdmin) {
        return res.status(401).json({ error: "User not Admin" });
      }
      const access_token = await generateToken({
        id: user._id,
      });

      const refresh_token = await refreshToken({
        id: user._id,
      });
      return res.json({
        status: "OK",
        message: "SUCESS",
        access_token,
        refresh_token,
      });
    } else {
      return res.status(401).json({ error: "Invalid Usermame or Password" });
    }
  } catch (error) {
    next(error);
  }
};
const refreshTokenService = (token) => {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
        if (err) {
          console.log("err", err);
          resolve({
            status: "ERR",
            message: "The authemtication",
          });
        }
        const access_token = await generateToken({
          id: user.id,
        });
        resolve({
          status: "OK",
          message: "SUCESS",
          access_token,
        });
      });
    } catch (e) {
      reject(e);
    }
  });
};

const RefreshTokenController = async (req, res, next) => {
  try {
    const token = req.body.token;
    if (!token) {
      return res.status(200).json({
        status: "ERR",
        message: "The token is required",
      });
    }
    const response = await refreshTokenService(token);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      message: e,
    });
  }
};

const updateAccount = async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;

  // const addressSchema = Joi.object({
  //     address: Joi.string().required(),
  //     ward: Joi.string().required(),
  //     district: Joi.string().required(),
  //     city: Joi.string().required(),
  //     code: Joi.string().required(),

  // });
  const userSchema = Joi.object({
    name: Joi.string().required(),
    // isAdmin: Joi.boolean(),
    sex: Joi.string(),
    phoneNumber: Joi.string(),
    email: Joi.string(),
    // address: Joi.array().items(addressSchema)
  });

  const { error, value } = userSchema.validate(updateData);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const user = await User.findOne({ _id: id });
    if (user) {
      user.name = updateData.name;
      user.phoneNumber = updateData.phoneNumber;
      user.email = updateData.email;
      user.sex = updateData.sex;

    //   if (updateData.address) {
    //     const { error: addressError, value: validatedAddress } =
    //       addressSchema.validate(updateData.address);
    //     if (addressError) {
    //       return res
    //         .status(400)
    //         .json({ error: addressError.details[0].message });
    //     }

    //     user.address.push(validatedAddress);
    //   }

      const updatedUser = await user.save();
      res.json({
        status: "OK",
        message: "SUCCESS",
        data: updatedUser,
      });
    } else {
      res.status(400).json({
        status: "ERROR",
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params._id);
    if (user) {
      res.json({
        status: "OK",
        message: "SUCESS",
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          sex: user.sex,
          address: user.address,
          phoneNumber: user.phoneNumber,
          wishList: user.wishList,
          isAdmin: user.isAdmin,
          note: user.note
        },
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res) => {
  try {
    const user = await User.find({ isDeleted: false });

    return res.json(user);
  } catch (error) {
    return res.status(400).json({ message: "co loi" });
  }
};
const updateAdmin = async (req, res) => {
  try {
    const userCheck = await User.findById(req.params.id);
    if (userCheck) {
      userCheck.isAdmin = req.body.isAdmin;
      await userCheck.save();
      res.status(200).json({ message: "Admin user updated successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { isDeleted: true },
      { new: true }
    );

    if (user) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const passwordNew = randomstring.generate(10);
      user.password = passwordNew;
      const updatedUser = await user.save();

      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "nguyendinhtu11022002@gmail.com",
          pass: "dipotwokkbgjlryq",
        },
      });

      var mailOptions = {
        from: "your_email@example.com",
        to: email,
        subject: "Password Reset",
        html: `
                  <html>
                    <body>
                      <h1>Password Reset</h1>
                      <p>Your new password is: ${passwordNew}</p>
                      <p>Please sign in with this password and then change it after signing in.</p>
                    </body>
                  </html>
                `,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      return res
        .status(200)
        .json({ message: "Check your email inbox to get a new password." });
    } else {
      return res.status(400).json({ message: "User does not exist." });
    }
  } catch (error) {
    next(error);
  }
};
const updateAddress = async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;

  const userSchema = Joi.object({
    address: Joi.string(),
    note: Joi.string(),
  });

  const { error, value } = userSchema.validate(updateData);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const user = await User.findOne({ _id: id });
    if (user) {
      user.address = updateData.address;
      user.note = updateData.note;
      
      const updatedUser = await user.save();
      res.json({
        status: "OK",
        message: "SUCCESS",
        data: updatedUser,
      });
    } else {
      res.status(400).json({
        status: "ERROR",
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
module.exports = {
  register,
  login,
  RefreshTokenController,
  updateAccount,
  getUserById,
  loginAdmin,
  getAll,
  updateAdmin,
  deleteUser,
  forgotPassword,
  updateAddress
};
