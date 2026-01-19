import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 100,
    },
    excerpt: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    content: {
      type: String,
    },
    description: {
      type: String,
      // required: true,
      trim: true,
      minlength: 10,
    },
    image: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

blogSchema.index({
  title: "text",
  excerpt: "text",
  content: "text",
});

blogSchema.index({ owner: 1, createdAt: -1 });

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
