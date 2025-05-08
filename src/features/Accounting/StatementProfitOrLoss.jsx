import React, { useContext, useEffect, useState } from "react";
import { Badge } from "../../components";
import { formatCurrency1, formatCurrency2 } from "../../utils";
import { AllContext } from "../../context/AllProvider";

const StatementProfitOrLoss = () => {
  const { profitOrLoss, companyName } = useContext(AllContext);
  const [sale, setSale] = useState(0);
  const [saleReturn, setSaleReturn] = useState(0);
  const [saleDiscount, setSaleDiscount] = useState(0);
  const [saleNet, setSaleNet] = useState(0);
  const [purchase, setPurchase] = useState(0);
  const [purchaseReturn, setPurchaseReturn] = useState(0);
  const [purchaseDiscount, setPurchaseDiscount] = useState(0);
  const [purchaseNet, setPurchaseNet] = useState(0);
  const [stockRemain, setStockRemain] = useState(0);
  const [cogs, setCogs] = useState(0);
  const [grossProfitLoss, setGrossProfitLoss] = useState(0);
  const [expense, setExpense] = useState([]);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [revenue, seRevenue] = useState([]);
  const [revenueTotal, setRevenueTotal] = useState(0);
  const [netProfitLoss, setNetProfitLoss] = useState(0);
  const [attributeTo, setAttributeTo] = useState([]);
  useEffect(() => {
    const {
      Sales,
      Purchase,
      StockRemain,
      COGS,
      GrossProfitOrLoss,
      Expenses,
      RevenueOthers,
      NetProfitOrLoss,
      ProfitAttribute,
    } = profitOrLoss;
    const { TotalSales, TotalSalesReturn, TotalSalesDiscount, TotalSalesNet } =
      Sales;
    setSale(TotalSales);
    setSaleReturn(TotalSalesReturn);
    setSaleDiscount(TotalSalesDiscount);
    setSaleNet(TotalSalesNet);
    const {
      TotalPurchase,
      TotalPurchaseReturn,
      TotalPurchaseDiscount,
      TotalPurchaseNet,
    } = Purchase;
    setPurchase(TotalPurchase);
    setPurchaseReturn(TotalPurchaseReturn);
    setPurchaseDiscount(TotalPurchaseDiscount);
    setPurchaseNet(TotalPurchaseNet);
    setStockRemain(StockRemain);
    setCogs(COGS);
    setGrossProfitLoss(GrossProfitOrLoss);
    const { Expense, TotalExpense } = Expenses;
    setExpense(Expense);
    setExpenseTotal(TotalExpense);
    const { RevenueOther, TotalRevenue } = RevenueOthers;
    seRevenue(RevenueOther);
    setRevenueTotal(TotalRevenue);
    setNetProfitLoss(NetProfitOrLoss);
    setAttributeTo(ProfitAttribute);
  }, [profitOrLoss]);
  return (
    <div className="flex flex-col">
      {/* head */}
      <div className="mb-2">
        <div className="font-bold text-2xl text-center">
          Statement Of Profit or Loss
        </div>
        <div className="font-bold text-xl text-center">{companyName}</div>
      </div>
      {/* body */}
      <div className="mb-2">
        {/*  sales */}
        <div className="mb-1">
          <div className="text-xl font-bold mb-1">Sales </div>
          <div className="ms-2 mb-1">
            {/* sales */}
            <div className="flex justify-between text-xl mb-1">
              <div>Sales</div>
              <div>{formatCurrency1(sale)}</div>
            </div>
            {/* sales return  */}
            <div className="flex justify-between text-xl mb-1">
              <div className="text-xl">Sales Return</div>
              <div className="text-xl">{formatCurrency1(saleReturn)}</div>
            </div>
            {/* sales discount  */}
            <div className="flex justify-between text-xl mb-1">
              <div className="text-xl">Sales Discount</div>
              <div className="text-xl">{formatCurrency1(saleDiscount)}</div>
            </div>
          </div>
          {/* net of sales */}
          <div className="flex justify-between">
            <div className="text-xl font-bold">Net Of Sales</div>
            <div className="text-xl font-bold">
              + {formatCurrency1(saleNet)}
            </div>
          </div>
        </div>
        {/*  purchase */}
        <div className="mb-1">
          <div className="text-xl font-bold mb-1">Purchase </div>
          <div className="ms-2 mb-1">
            {/* purchase */}
            <div className="flex justify-between text-xl mb-1">
              <div>Purchase</div>
              <div>{formatCurrency1(purchase)}</div>
            </div>
            {/* purchase return  */}
            <div className="flex justify-between text-xl mb-1">
              <div className="text-xl">Purchase Return</div>
              <div className="text-xl">{formatCurrency1(purchaseReturn)}</div>
            </div>
            {/* purchase discount  */}
            <div className="flex justify-between text-xl mb-1">
              <div className="text-xl">Purchase Discount</div>
              <div className="text-xl">{formatCurrency1(purchaseDiscount)}</div>
            </div>
          </div>
          {/* net of purchase */}
          <div className="flex justify-between">
            <div className="text-xl font-bold">Net Of Purchase</div>
            <div className="text-xl font-bold">
              {formatCurrency1(purchaseNet)}
            </div>
          </div>
        </div>
        {/* cogs */}
        <div className="mb-1">
          <div className="text-xl font-bold mb-1">Cost Of Goods Sold </div>
          <div className="ms-2 mb-1">
            {/* net of purchase */}
            <div className="flex justify-between text-xl mb-1">
              <div>Net Of Purchase</div>
              <div>{formatCurrency1(purchaseNet)}</div>
            </div>
            {/* remain stock  */}
            <div className="flex justify-between text-xl mb-1">
              <div className="text-xl">Remain Stock</div>
              <div className="text-xl">{formatCurrency1(stockRemain)}</div>
            </div>
          </div>
          {/* total of cogs */}
          <div className="flex justify-between">
            <div className="text-xl font-bold">Total Cost of Goods Sold</div>
            <div className="text-xl font-bold">- {formatCurrency1(cogs)}</div>
          </div>
        </div>
        {/* gross of profit */}
        <div className="mb-1">
          <div className="flex justify-between text-xl mb-1 font-bold">
            <div>Gross Of Profit or Loss</div>
            <div>{formatCurrency1(grossProfitLoss)}-</div>
          </div>
        </div>
        {/* expense */}
        <div className="mb-1">
          <div className="text-xl font-bold mb-1">Expense </div>
          <div className="ms-2 mb-1">
            {expense.length >= 1 &&
              expense.map((el, i) => (
                <div className="flex justify-between text-xl mb-1" key={i}>
                  <div>{el.AccountingName}</div>
                  <div>{formatCurrency1(el.Total)}</div>
                </div>
              ))}
          </div>
          {/* total expense */}
          <div className="flex justify-between">
            <div className="text-xl font-bold">Total of Expense</div>
            <div className="text-xl font-bold">
              - {formatCurrency1(expenseTotal)}
            </div>
          </div>
        </div>
        {/* other revenue */}
        <div className="mb-1">
          <div className="text-xl font-bold mb-1">Other Revenue </div>
          <div className="ms-2 mb-1">
            {revenue.length >= 1 &&
              revenue.map((el, i) => (
                <div className="flex justify-between text-xl mb-1" key={i}>
                  <div>{el.AccountingName}</div>
                  <div>{formatCurrency1(el.Total)}</div>
                </div>
              ))}
          </div>
          {/* total revenue */}
          <div className="flex justify-between">
            <div className="text-xl font-bold">Total of Other Revenue</div>
            <div className="text-xl font-bold">
              + {formatCurrency1(revenueTotal)}
            </div>
          </div>
        </div>
        {/* net of profit or loss */}
        <div className="mb-1">
          <div className="flex justify-between items-center text-xl mb-1 font-bold">
            <div>Net Of Profit or Loss</div>
            <div>
              <Badge
                title={formatCurrency2(netProfitLoss)}
                className={`${netProfitLoss >= 1 && "bg-green-600"} ${
                  netProfitLoss === 0 && "bg-slate-500"
                } ${netProfitLoss < 0 && "bg-red-500"}`}
              />
            </div>
          </div>
        </div>
        {/* profit attributable to */}
        <div className="mb-1">
          <div className="text-xl font-bold mb-1">Profit Attributable To </div>
          <div className="ms-2 mb-1">
            {attributeTo.length >= 1 &&
              attributeTo.map((el, i) => (
                <div className="flex justify-between text-xl mb-1" key={i}>
                  <div>{el.UserFullname}</div>
                  <div>{formatCurrency1(el.ProfitAttributed)}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatementProfitOrLoss;
