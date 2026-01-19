import express from "express";
import { login, signup } from "../controller/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { createBlog, deleteBlog, getAllBlogs, getBlog, getUserBlogs, searchBlog, updateBlog } from "../controller/blogController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/all-blogs",getAllBlogs);
router.get("/user-blogs",protect,getUserBlogs);
router.get("/getBlog/:blogId",protect,getBlog)
router.post("/create-blog",protect,upload.single("image"),createBlog);
router.put("/update-blog/:blogId",protect,updateBlog);
router.delete("/delete-blog/:blogId",protect,deleteBlog);
router.get("/search",searchBlog);


export default router;