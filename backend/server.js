import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import adminRouter from "./routes/adminRoute.js";

// App config
const app = express();
const port = process.env.PORT || 5000;

// Connect DB and Cloudinary
//connectDB();
//connectCloudinary();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API Working");
});

app.use((err, req, res, next) => {
  console.error(err.stack || err);
  res.status(500).json({ success: false, message: 'Something went wrong!', error: err.message });
});

app.listen(port, () => console.log(`Server started on PORT:${port}`));
