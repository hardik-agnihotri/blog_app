import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import SingleBlog from "./pages/SingleBlog";
import Userpage from "./pages/Userpage";
import AddNewBlog from "./pages/AddNewBlog";
import EditBlogPage from "./pages/EditBlogPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog/:id" element={<SingleBlog />} />
        <Route path="/user/:id" element={<Userpage />} />
        <Route path="/add-blog" element={<AddNewBlog />} />
        <Route path="/update-blog/:blogId" element={<EditBlogPage />} />
      </Routes>
    </>
  );
}

export default App;
