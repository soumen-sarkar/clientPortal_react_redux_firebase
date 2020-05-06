import React from "react";
import { Link } from "react-router-dom";

export default function BackToDashboard() {
  return (
    <div>
      <Link to={"/"} className="btn btn-link">
        <i className="fas fa-arrow-circle-left"></i> Back to Dashboard
      </Link>
    </div>
  );
}
