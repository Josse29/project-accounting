import React, { useContext, useEffect } from "react";
import { Card } from "../../components";
import StatementFinancialPosition from "./StatementFinancialPosition";
import StatementProfitOrLoss from "./StatementProfitOrLoss";
import StatementOfEquity from "./StatementOfEquity";
import { AllContext } from "../../context/AllProvider";

const CardFinancialStatement = () => {
  const {
    getFinancialStatement,
    companyName,
    totalRows,
    financialPositions,
    changesEquity,
    profitOrLoss,
  } = useContext(AllContext);
  useEffect(() => {
    getFinancialStatement();
  }, []);
  return (
    <Card>
      <Card.Header
        headerTitle="Financial Statement"
        className="bg-[#1c1cf0] text-center"
      />
      <Card.Body>
        {totalRows < 1 && (
          <div className="w-full h-[550px] flex">
            <div className="m-auto text-2xl italic text-slate-500 font-bold">
              Accounting is Empty....
            </div>
          </div>
        )}
        {totalRows >= 1 && (
          <div className="flex gap-7 w-full overflow-x-auto">
            <div className="w-1/2">
              <StatementFinancialPosition
                companyName={companyName}
                financialPositions={financialPositions}
              />
              <StatementOfEquity
                companyName={companyName}
                changesEquity={changesEquity}
              />
            </div>
            <div className="w-1/2">
              <StatementProfitOrLoss
                companyName={companyName}
                profitOrLoss={profitOrLoss}
              />
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default CardFinancialStatement;
