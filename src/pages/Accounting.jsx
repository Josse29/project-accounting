import React from "react";
import { NavigationContainer } from "../navigation";
import { Card1, Container } from "../components";
import { FaChartSimple } from "react-icons/fa6";
import { CardAccounting, CardFinancialStatement } from "../features/Accounting";

const Accounting = () => {
  return (
    <NavigationContainer>
      <Card1
        page="Accounting"
        icon={<FaChartSimple />}
        className="border-[#5c5cff]"
      />
      <Container>
        <CardAccounting />
        <CardFinancialStatement />
      </Container>
    </NavigationContainer>
  );
};

export default Accounting;
