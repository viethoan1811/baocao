const express = require("express");
const { createProduct, getAllProduct, getByIdProduct, getByCategory, updateProduct, deleteProduct } = require("../controllers/ProductController");
const router = express.Router();
const { protect, admin } = require("../middleware/AuthMiddleware");


router.post("/",createProduct );
router.get("/", getAllProduct);
router.get("/:id",getByIdProduct);
router.get("/get/category/:id",getByCategory);
router.put("/update/:id",updateProduct)
router.post("/delete/:id",deleteProduct)
module.exports = router;