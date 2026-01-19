import React from "react";
import { Link } from "react-router-dom";

const HorizontalCard = ({ blogId,title,blogImage, description, deleteCallback }) => {
  return (
  <div className="horizontal-card-container"  style={{ backgroundImage: `url(${blogImage})` }}>
      <div className="hz-card">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div>
        <Link to={`/update-blog/${blogId}`}>
          <button>Edit</button>
        </Link>
        <button className="dlt-btn" onClick={deleteCallback}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default HorizontalCard;
