import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import router from "./routes/authRoutes.js";
import routerBook from "./routes/bookRoutes.js";
import routerProfile from "./routes/profileRoutes.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "https://vermillion-kelpie-47145d.netlify.app",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.get("/", (req, res) => {
  res.send("hello my world");
});

//connect DB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected DB");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
connectDB();

app.use("/api/", router);
app.use("/api/book/", routerBook);
app.use("/api/", routerProfile);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});
