import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleBlog, updateBlog } from "../api/blogApi";

const EditBlogPage = () => {
  const { blogId } = useParams();
  // const navigate = useNavigate();

  const [blogDetail, setBlogDetail] = useState({
    title: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const res = await getSingleBlog(blogId);
        setBlogDetail({
          title: res.blog.title,
          description: res.blog.description,
        });
      } catch (error) {
        console.error("Failed to fetch blog", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetail();
  }, [blogId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateBlog(blogId, blogDetail);
      alert("Blog updated successfully");
      // navigate(`/user/${blogDetail.owner.toString()}`); // 👈 best UX
    } catch (error) {
      alert(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog Title</label>
        <input
          type="text"
          name="title"
          value={blogDetail.title}
          onChange={handleChange}
        />

        <label>Blog description</label>
        <textarea
          name="description"
          value={blogDetail.description}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Blog"}
        </button>
      </form>
    </div>
  );
};

export default EditBlogPage;
