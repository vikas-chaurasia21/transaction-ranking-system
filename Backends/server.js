const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const transactionRoutes = require("./routes/transactionRoutes");
const apiLimiter = require("./middleware/rateLimiter");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", apiLimiter, transactionRoutes);

app.get("/", (req, res) => {
  res.send("Transaction Ranking API Running...");
});

module.exports = app;