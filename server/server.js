// packages
const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Utils
const connectDB = require("./config/db.js");
const userRouter = require("./routes/userRouter.js");
const categoryRoutes = require("./routes/categoryRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const uploadRoutes = require("./routes/uploadRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");

dotenv.config();
const port = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = [
  'http://localhost:5173', //local development
  'https://week-8-capstone-sir-james-muritu.vercel.app' //production
]

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    // allow postman / curl requests
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());


// app.get("/api/v1", (req, res) => {
//   res.json({ message: "Welcome" });
// });
app.use("/api/v1/users", userRouter);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/upload", uploadRoutes);
app.use("/api/v1/orders", orderRoutes);

//******PayPal********
app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

console.clear();

app.listen(port, () => console.log(`Server running on port: ${port}`));


