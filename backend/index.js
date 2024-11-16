import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./db/db.js"
import cloudinary from "cloudinary"
import path from "path";
// Configure dotenv first
dotenv.config();

cloudinary.v2.config({
  cloud_name:process.env.CLOUDINARY_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET
})

// Then create express app and set up middleware
const app = express();
app.use(express.json());
app.use(cookieParser());

//Routes
import userRoutes from "./routes/user.Routes.js";
import songRoutes from "./routes/song.Routes.js";
import { execPath } from "process";

app.use("/api/user", userRoutes);
app.use("/api/song",songRoutes);

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});


const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});
