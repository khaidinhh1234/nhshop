import React from "react";
import { Outlet } from "react-router-dom";

const LayoutHome = () => {
  return (
    <>
      {/* <h2>heloelvgf home</h2> */}
      <div>
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default LayoutHome;
