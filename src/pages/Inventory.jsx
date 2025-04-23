import React, { useEffect } from "react";
import { NavigationContainer } from "../navigation";
import { FaFileCirclePlus } from "react-icons/fa6";
import { CardSale, CardStock } from "../features/Stock";
import { CardProduct } from "../features/Product";
import { Card1, Container } from "../components";

const Inventory = () => {
  return (
    <NavigationContainer>
      <Card1
        page="Inventory"
        icon={<FaFileCirclePlus />}
        className="border-[#3c50e0]"
      />
      <Container>
        {/* card stock */}
        <div className="mb-7 overflow-x-auto">
          <CardStock />
        </div>
        {/* card sale */}
        <div className="mb-7 overflow-x-auto">
          <CardSale />
        </div>
        {/* card product */}
        <div className="mb-7 overflow-x-auto">
          <CardProduct />
        </div>
      </Container>
    </NavigationContainer>
  );
};

export default Inventory;
