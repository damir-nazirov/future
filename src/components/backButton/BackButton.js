import React from "react";
import { Link } from "react-router-dom";

import "./backButton.css"

const BackButton = () => {
  return (
    <div className="back-button">
      <Link to="/">Back to home</Link>
    </div>
  );
};

export default BackButton;
