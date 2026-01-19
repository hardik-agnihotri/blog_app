import React, { useEffect, useState } from "react";
import HorizontalCard from "../components/HorizontalCard";
import { useAuth } from "../context/AuthContext";
import { deleteBlog, getAllUserBlog } from "../api/blogApi";
import { Link } from "react-router-dom";

const Userpage = () => {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getAllUserBlog();
        setBlogs(data.allBlogs || []);
      } catch (err) {
        setError("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) return;

    try {
      await deleteBlog(id);

      setBlogs((prevBlogs) =>
        prevBlogs.filter((blog) => blog._id !== id)
      );
    } catch (err) {
      alert("Failed to delete blog");
    }
  };

  if (loading) return <p>Loading blogs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="profile-page container">
      <div>
        <h1 className="profile-title">Welcome {user?.username}</h1>

        <Link to="/add-blog">
          <button className="new-blog-add">Add new Blog</button>
        </Link>
      </div>

      <div className="blogs-container">
        <h2 className="blog-title">All blogs ({blogs.length})</h2>

        {blogs.length === 0 ? (
          <p>No blogs created yet.</p>
        ) : (
          blogs.map((blog) => (
            <HorizontalCard
              key={blog._id}
              title={blog.title}
              description={blog.description}
              blogId={blog._id}
              blogImage={blog.image}
              deleteCallback={() => handleDelete(blog._id)
              }
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Userpage;
