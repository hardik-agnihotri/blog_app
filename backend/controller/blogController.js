import Blog from "../model/blogModel.js";

export const getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await Blog.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "Blogs Found",
      allBlogs,
    });
  } catch (error) {
    console.error("Error finding blogs", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getUserBlogs = async (req, res) => {
  const user = req.user;
  try {
    const allBlogs = await Blog.find({ owner: user._id }).sort({
      createdAt: -1,
    });
    return res.status(200).json({
      success: true,
      message: `Blogs Found for username ${user.username}`,
      allBlogs,
    });
  } catch (error) {
    console.error("Error finding blogs", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const createBlog = async (req, res) => {
  const user = req.user;
  console.log("File:", req.file);
  console.log("Body:", req.body);

  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const newBlog = await Blog.create({
      title,
      description,
      image: req.file.path,
      owner: user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
      newBlog,
    });
  } catch (error) {
    console.error("Error creating blog", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const user = req.user;
    const { blogId } = req.params;
    const { title, description } = req.body;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    if (blog.owner.toString() !== user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this blog",
      });
    }

    if (title !== undefined) blog.title = title;
    if (description !== undefined) blog.description = description;
    const updatedBlog = await blog.save();
    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      updatedBlog,
    });
  } catch (error) {
    console.error("Error updating blog", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const user = req.user;
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    if (blog.owner.toString() !== user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this blog",
      });
    }

    await blog.deleteOne();
    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting blogs", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getBlog = async (req, res) => {
  try {
    const user = req.user;
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // ownership check
    if (blog.owner.toString() !== user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to edit this blog",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blog fetched successfully",
      blog,
    });
  } catch (error) {
    console.error("Error fetching blog", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const searchBlog = async (req, res) => {
  try {
    const query = req.query.q;
    const searchedBlog = await Blog.find({
      title: { $regex: query, $options: "i" },
    });
    return res
      .status(200)
      .json({
        success: true,
        message: `Searched result for ${query}`,
        searchedBlog,
      });
  } catch (error) {
    console.error("Error fetching blog", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
