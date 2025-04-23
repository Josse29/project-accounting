import React from "react";
import { NavigationContainer } from "../navigation";
import { CardCash } from "../features/Accounting";
import {
  CardListInvestor,
  CardListLiability,
  CardListReceivable,
  CardListSale,
  CardUser1,
} from "../features/User";
import { CardChartSale } from "../features/Stock";

const Dashboard = () => {
  return (
    <NavigationContainer>
      {/* section first */}
      <div className="flex gap-7 mb-9 w-full">
        {/* cash */}
        <CardCash />
        {/* user */}
        <CardUser1 />
      </div>
      {/* section second */}
      <div className="flex gap-7 mb-7 w-full">
        <div className="w-[65%] shadow-md rounded-b-2xl">
          <CardChartSale />
        </div>
        <div className="w-[35%] shadow-md rounded-b-2xl">
          <CardListSale />
        </div>
      </div>
      {/* section third */}
      <div className="grid grid-cols-3 gap-5">
        {/* investor */}
        <div>
          <CardListInvestor />
        </div>
        {/* receivable */}
        <div>
          <CardListReceivable />
        </div>
        {/* payable */}
        <div>
          <CardListLiability />
        </div>
      </div>
    </NavigationContainer>
  );
};

export default Dashboard;
