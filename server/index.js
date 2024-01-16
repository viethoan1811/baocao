const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const connectDatabase = require("./config/Mongodb")
const UserRouter = require("./routers/User")
const ProductRouter = require("./routers/Product")
const CategoryRouter = require("./routers/Category")
const OrderRouter = require("./routers/Order")
const PaymentRouter = require("./routers/Payment")

dotenv.config();
connectDatabase();

const allowedOrigins = ['http://localhost:4000','http://localhost:9000'];
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));
app.use(express.json());

app.use("/api/v1/user", UserRouter);
app.use("/api/v1/product", ProductRouter);
app.use("/api/v1/category", CategoryRouter);
app.use("/api/v1/order", OrderRouter);
app.use("/api/v1/payment", PaymentRouter);

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server started on ${process.env.PORT}`)
);