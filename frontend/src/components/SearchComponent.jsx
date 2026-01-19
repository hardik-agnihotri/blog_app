import React, { useState } from "react";
import { searchedBlogs } from "../api/blogApi";
import { useEffect } from "react";

const SearchComponent = ({ setBlogProp }) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timeout = setTimeout(async () => {
      const res = await searchedBlogs(search);
      setBlogProp(res.searchedBlog);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await searchedBlogs(search);
    setBlogProp(res.searchedBlog);
  };
  return (
    <div>
      <form onSubmit={handleSearch}>
        <label htmlFor="search">Search Blog</label>
        <input
          type="text"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default SearchComponent;
