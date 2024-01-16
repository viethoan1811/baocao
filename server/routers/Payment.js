const express = require("express");
const { createPayment, getAllPayment, getPaymentById, updatePayment, deletePayment, getPaymentByUser } = require("../controllers/PaymentController");
const router = express.Router();
const {  admin } = require("../middleware/AuthMiddleware");

router.post("/",createPayment );
router.get("/getAll", getAllPayment);
router.get("/getById/:id",getPaymentById);
router.get("/get/user/:id",getPaymentByUser);
router.put("/update/:id",updatePayment)
router.delete("/delete/:id",deletePayment)
module.exports = router;