import React, { useState } from "react";
// import "./modal.css";
import Signup from "./Signup";


const Modal = ({ isOpen, onClose }) => {
  const [isSignup, setIsSignup] = useState(true);
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3>{isSignup ? "Sign-Up" : "Login"}</h3>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="modal-body"><Signup closeModal={onClose} setIsSignup={setIsSignup} isSignup={isSignup}/></div>
      </div>
    </div>
  );
};

export default Modal;
