import React from "react";
import { Outlet } from "react-router-dom";

const LayoutProduct = () => {
  return (
    <div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutProduct;
