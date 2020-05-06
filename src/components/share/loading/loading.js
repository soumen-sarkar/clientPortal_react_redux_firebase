import React from "react";
import loading from "./loading.gif";

export default () => {
  return (
    <div>
      <img
        src={loading}
        alt="Loading..."
        style={{ width: "60px", display: "block", margin: "0 auto" }}
      />
    </div>
  );
};
