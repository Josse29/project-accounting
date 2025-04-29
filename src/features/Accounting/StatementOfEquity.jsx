import React, { useContext, useEffect, useState } from "react";
import { Badge } from "../../components";
import { formatCurrency1, formatCurrency2 } from "../../utils";
import { AllContext } from "../../context/AllProvider";

const StatementOfEquity = () => {
  const { changesEquity } = useContext(AllContext);
  const [equity, setEquity] = useState([]);
  const [equityTotal, setEquityTotal] = useState(0);
  const [equityWithDraw, setEquityWithDraw] = useState([]);
  const [equityWithDrawTotal, setEquityWithDrawTotal] = useState(0);
  const [incomeSum, setIncomSum] = useState(0);
  const [equityChanges, setEquityChanges] = useState(0);
  useEffect(() => {
    // equity
    const {
      Equity,
      TotalEquity1,
      EquityWithDrawl,
      TotalEquityWithDrawl,
      NetProfitOrLoss,
      TotalEquityChanges,
    } = changesEquity;
    setEquity(Equity);
    setEquityTotal(TotalEquity1);
    setEquityWithDraw(EquityWithDrawl);
    setEquityWithDrawTotal(TotalEquityWithDrawl);
    setIncomSum(NetProfitOrLoss);
    setEquityChanges(TotalEquityChanges);
  }, [changesEquity]);
  return (
    <div className="flex flex-col">
      {/* head */}
      <div className="mb-2">
        <div className="font-bold text-2xl text-center">
          Statement Of Equity In Changes
        </div>
        <div className="font-bold text-xl text-center">Josstack</div>
      </div>
      {/* body */}
      <div className="mb-1">
        {/* Equity */}
        <div className="mb-1">
          {/* equity */}
          <div className="text-xl font-bold mb-1">Equity</div>
          {equity.length >= 1 &&
            equity.map((el, i) => (
              <div className="flex justify-between text-xl mb-1 ms-2" key={i}>
                <div>{el.AccountingName.split("-")[1]}</div>
                <div>{formatCurrency1(el.TotalEquity)}</div>
              </div>
            ))}
          {/* total equity */}
          <div className="flex justify-between text-xl mb-1 font-bold">
            <div>Total Equity</div>
            <div>{formatCurrency1(equityTotal)}</div>
          </div>
        </div>
        {/* withdraw */}
        <div className="mb-1">
          {/* withdraw */}
          <div className="text-xl font-bold mb-1">Withdraw</div>
          {equityWithDraw.length >= 1 &&
            equityWithDraw.map((el, i) => (
              <div className="flex justify-between text-xl mb-1 ms-2" key={i}>
                <div>{el.AccountingName.split("-")[1]}</div>
                <div>{formatCurrency2(el.TotalEquityWithDrawl)}</div>
              </div>
            ))}
          {/* total withdraw */}
          <div className="flex justify-between text-xl mb-1 font-bold">
            <div>Total Withdraw </div>
            <div>{formatCurrency2(equityWithDrawTotal)}</div>
          </div>
        </div>
        {/* income summary */}
        <div className="flex justify-between items-center text-xl mb-1 font-bold">
          <div>Income Summary</div>
          <div>
            <Badge
              title={formatCurrency2(incomeSum)}
              className={`${incomeSum >= 1 && "bg-green-600"} ${
                incomeSum === 0 && "bg-slate-500"
              } ${incomeSum < 0 && "bg-red-500"}`}
            />
          </div>
        </div>
        {/* total equity */}
        <div className="flex justify-between text-xl mb-1 font-bold">
          <div>Total Equity in Changes</div>
          <div>{formatCurrency1(equityChanges)}</div>
        </div>
      </div>
    </div>
  );
};

export default StatementOfEquity;
