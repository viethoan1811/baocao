const express = require("express");
const { createOrder, getAllOrder, getOrderById, updateOrder, deleteOrder, getOrderByCode, delteOrdeByCode, getOrderByUser, getDetailOrder } = require("../controllers/OrderController");
const router = express.Router();
const { protect, admin } = require("../middleware/AuthMiddleware");

router.post("/",createOrder );
router.get("/getAll", getAllOrder);
router.get("/getByCode/:code", getOrderByCode)
router.get("/getById/:id",getOrderById);
router.put("/update/:id",updateOrder)
router.delete("/:id",deleteOrder)
router.put("/deleteByCode/:code",delteOrdeByCode)
router.get("/getByUser/:id",getOrderByUser)
router.get("/getDetailOrder/user/:id",getDetailOrder)
module.exports = router;