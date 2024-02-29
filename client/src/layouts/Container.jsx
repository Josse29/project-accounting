import React from "react";
import TopDashboard from "./TopDashboard";
import SideDashboard from "./SideDashboard";

const Container = ({ children }) => {
  return (
    <div className="poppins text-white">
      <TopDashboard />
      <SideDashboard />
      <div className="ml-[120px]">
        <div className="m-6">{children}</div>
      </div>
    </div>
  );
};

export default Container;
