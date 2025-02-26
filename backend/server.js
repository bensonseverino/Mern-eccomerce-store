import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";

// INFO: Create express app
const app = express();
const port = process.env.PORT || 4000;
const path = require("path");
connectDB();
connectCloudinary();

// INFO: Middleware
app.use(express.json());
app.use(cors());

// INFO: API endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

// INFO: Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

//production script
app.use(express.static("•/client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "build", "index.html"));
});

// INFO: Start server
app.listen(port, () =>
  console.log(`Server is running on at http://localhost:${port}`)
);
