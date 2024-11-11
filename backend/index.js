import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./db/db.js"

// Configure dotenv first
dotenv.config();

// Then create express app and set up middleware
const app = express();
app.use(express.json());
app.use(cookieParser());

//Routes
import userRoutes from "./routes/user.Routes.js";

app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
})

const port = process.env.PORT||4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});
