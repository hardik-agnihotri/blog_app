import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { getAllBlog } from "../api/blogApi";
import { getUser } from "../api/userApi";
import SearchComponent from "../components/SearchComponent";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useAuth();
  const visibleBlogs = user ? blogs : blogs.slice(0, 3);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getAllBlog();
        setBlogs(data.allBlogs);
      } catch (error) {
        setError("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, []);

  if (loading) return null;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="main-content">
        <SearchComponent setBlogProp={setBlogs} />
        {visibleBlogs.map((blog) => (
          <Card
            key={blog._id}
            title={blog.title}
            description={blog.description}
            id={blog._id}
          />
        ))}
        {!user && blogs.length > 2 && (
          <button className="load-more-btn">Load More</button>
        )}
      </div>
    </div>
  );
};

export default HomePage;
