import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { appError } from "./utils/error";

// Route imports
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import paymentRoutes from "./routes/paymentRoutes";


// import { createPost } from "./controllers/postContoller";
import Post from "./models/postSchema";



const cors = require("cors");
const app = express();
const port = 3000;

const corsOptions = {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/get/:id", async(req, res) => {
  res.send("this message comming form ngo backend...");
});

dotenv.config();

//const MONGO_URI = process.env.MONGO_URI as string;
const MONGO_URI='mongodb+srv://hemant9808:ySEEecsHJArJfzfA@mydb.ovbqzxf.mongodb.net/chatApp'
console.log("MONGO_URI", MONGO_URI);

const connect = mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("db connected");
  })
  .catch((error) => {
    console.log("db error:", error);
  });

app.use("/", userRoutes);
app.use("/", postRoutes);
app.use("/",paymentRoutes)
export const getPostById = async (req: any, res: any) => {
  try {
    let id = req.params.id;
    const post = await Post.find({ _id: id });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// app.all("*", (req, res, next) => {
//    next(appError(`can't find ${req.originalUrl} on this server`, 404));
//  });

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
