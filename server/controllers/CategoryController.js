const Category = require("../models/Category");
const Joi = require("joi");

const createCategory = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required().messages({
      "any.required": "Name is required",
    }),
    listChild: Joi.array().items(Joi.string()),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  try {
    const { name } = req.body;
    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
      return res.status(400).json({ message: "Category already exists" });
    }
    const category = await Category.create({
      name,
    });
    if (category) {
      return res.status(201).json({
        message: "Success!",
      });
    } else {
      res.status(400).json({ message: "Invalid Category Data" });
    }
  } catch (error) {
    next(error);
  }
};
const getAllCategory = async (req, res) => {
  try {
    const data = await Category.find({});
    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.json({ message: "Co loi" });
  }
};
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Category.findOne({ _id: id });
    if (data) {
      return res.json(data);
    } else {
      return res.jon({ message: "Category not found" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: "Co loi" });
  }
};
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Category.findByIdAndDelete({ _id: id });
    if (data) {
      return res.json({ message: "Succes" });
    } else {
      return res.jon({ message: "Delete Error" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: "Co loi" });
  }
};
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const data = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (data) {
      return res.json({ message: "Update succes" });
    } else {
      return res.jon({ message: "Update Error" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: "Co loi" });
  }
};
module.exports = {
  createCategory,
  getAllCategory,
  getById,
  deleteCategory,
  updateCategory,
};
