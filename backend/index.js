import dotenv, { config } from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { connection } from "./db/connection.js";
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";


const app = express();
connection();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
const PORT = process.env.port || 4000;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
app.use("/api/v1/user/", userRoutes);
app.use("/api/v1/blog/", blogRoutes);
