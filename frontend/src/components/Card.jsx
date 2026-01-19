import React from "react";
import { Link } from "react-router-dom";

const Card = ({ title, description, id }) => {
  return (
    <div className="card-container">
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">
          {description.trim().length > 220
            ? description.trim().slice(0, 200) + "..."
            : description}
        </p>
        <Link className="remove-decoration" to={`blog/${id}`}>
          <button className="card-btn">Real Full Blog</button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
