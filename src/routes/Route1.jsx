import React from "react";
import { Route, Routes } from "react-router";
import {
  About,
  Accounting,
  Dashboard,
  Inventory,
  Login,
  Order,
  User,
} from "../pages";
const Route1 = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/order" element={<Order />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/accounting" element={<Accounting />} />
      <Route path="/users" element={<User />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};
export default Route1;
