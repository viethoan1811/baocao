const Product = require("../models/Product");
const Joi = require("joi");

const createProduct = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    quantity: Joi.number().required(),
    category: Joi.string().required(),
    price: Joi.number().required(),
    rate: Joi.number().default(0),
    description: Joi.string().required(),
    imgUrl: Joi.array().required(),
    brand: Joi.string().required()
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Tạo sản phẩm mới
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllProduct = async (req, res) => {
  try {
    const product = await Product.find({}).sort({ createdAt: -1 }).populate('category', 'name');
    return res.json(product);
  } catch (error) {
    res.json(error);
  }
};
const getByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.find({ category: id });
    if (product) {
      return res.json(product);
    } else {
      return res.jon([]);
    }
  } catch (error) {
    return res.json(error);
  }
};
const getByIdProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id });
    if (product) {
      return res.json(product);
    } else {
      return res.jon({ message: "Product not found" });
    }
  } catch (error) {
    return res.json(error);
  }
};
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (updatedProduct) {
      return res.json({ message: "Update succes" });
    } else {
      return res.jon({ message: "Update Error" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: "Co loi" });
  }
};
const deleteProduct =async(req,res)=>{
    try {
        const {id} = req.params
        const data = await Product.findByIdAndDelete({_id:id})
        if(data){
            return res.json({message:"Succes"}) 
        }
        else{
            return res.jon({message:"Delete Error"})
        }
    } catch (error) {
        console.log(error)
        return res.json({message:"Co loi"})
    }
}
module.exports = {
  createProduct,
  getByIdProduct,
  getAllProduct,
  getByCategory,
  updateProduct,
  deleteProduct
};
