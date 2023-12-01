import React from "react";
import PostedByHeader from "./PostedByHeader.png";
const HeaderImage = () => {
  return (
    <div style={{ textAlign: "center", marginBottom: "0px" }}>
      <img
        src={PostedByHeader}
        alt="PostedBy Header"
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default HeaderImage;
