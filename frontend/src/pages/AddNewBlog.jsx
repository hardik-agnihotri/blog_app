import React, { useState } from "react";
import { createBlog } from "../api/blogApi";

const AddNewBlog = () => {
  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setBlogData({ ...blogData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", blogData.title);
      formData.append("description", blogData.description);
      formData.append("image", blogData.image);

      const response = await createBlog(formData);

      setSuccess(response.message || "Blog Created successfully");
      setBlogData({ title: "", description: "", image: null });
    } catch (error) {
      const errorMsg = error?.response?.data?.message || "Something went wrong";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter Blog Title</label>
        <input
          type="text"
          name="title"
          value={blogData.title}
          onChange={handleChange}
          required
        />

        <label>Enter Blog Description</label>
        <input
          type="text"
          name="description"
          value={blogData.description}
          onChange={handleChange}
          required
        />

        <label>Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Create Blog"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </form>
    </div>
  );
};

export default AddNewBlog;
