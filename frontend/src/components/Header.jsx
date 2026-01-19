import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import { useAuth } from "../context/AuthContext";
import { CgProfile } from "react-icons/cg";

const Header = () => {
  // const [isUser, setIsUser] = useState(false);
  const [isOpen, setisOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { user, loading, logout, enableGhostMode } = useAuth();
  if (loading) return null;
  return (
    <div className="full-width header-bg">
      <header className="premium-header container">
        <div className="logo">
          <Link to="/">
            <span>Blog</span>World
          </Link>
        </div>

        <nav className="navbar">
          <ul className="nav-links">
            <li>
              {user ? (
                <>
                  <Link onClick={() => setOpen(true)}>
                    {" "}
                    <CgProfile size={30} /> {user.username}
                  </Link>
                  {open && (
                    <div className="dropdown" ref={dropdownRef}>
                      <Link
                        to={`/user/${user._id}`}
                        onClick={() => setOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link to="/add-blog" onClick={() => setOpen(false)}>
                        Create Blog
                      </Link>
                      <div className="ghost-toggle">
                        <span>Ghost Mode</span>

                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={user.isGhost}
                            onChange={() => enableGhostMode()}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                      <button
                        className="logout-btn"
                        onClick={() => {
                          logout();
                          setOpen(false);
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link onClick={() => setisOpen(!isOpen)}>Signup</Link>
              )}
            </li>
          </ul>
        </nav>
      </header>
      <Modal isOpen={isOpen} onClose={() => setisOpen(!isOpen)} />
    </div>
  );
};

export default Header;
