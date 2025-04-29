import React, { useContext, useEffect, useState } from "react";
import { formatCurrency1, formatCurrency2 } from "../../utils";
import { AllContext } from "../../context/AllProvider";

const StatementFinancialPosition = () => {
  const { financialPositions } = useContext(AllContext);
  const [cash, setCash] = useState(0);
  const [currentAsset, setCurrentAsset] = useState([]);
  const [currentAssetTotal, setCurrentAssetTotal] = useState(0);
  const [receivable, setReceivable] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [fixAsset, setFixAsset] = useState([]);
  const [fixAssetAccm, setFixAssetAccm] = useState([]);
  const [fixAssetTotal, setFixAssetTotal] = useState(0);
  const [assetTotal, setAssetTotal] = useState(0);
  const [liability, setLiability] = useState([]);
  const [liabilityTotal, setLiabilityTotal] = useState(0);
  const [equity, setEquity] = useState([]);
  const [equityTotal, setEquityTotal] = useState(0);
  const [liabiltyEquityTotal, setLiabiltyEquityTotal] = useState(0);
  useEffect(() => {
    const { Assets, LiabilityEquity } = financialPositions;
    const { CurrentAssets, FixedAssets, TotalAssetsChanges } = Assets;
    // current-assets
    const {
      TotalCash,
      TotalReceivable,
      CurrentAsset,
      MerchandiseInventory,
      TotalCurrentAssetChanges,
    } = CurrentAssets;
    setCash(TotalCash);
    setReceivable(TotalReceivable);
    setInventory(MerchandiseInventory);
    setCurrentAsset(CurrentAsset);
    setCurrentAssetTotal(TotalCurrentAssetChanges);
    // fixed-assets
    const { FixedAsset, FixedAccumulated, TotalFixedAsset } = FixedAssets;
    setFixAsset(FixedAsset);
    setFixAssetAccm(FixedAccumulated);
    setFixAssetTotal(TotalFixedAsset);
    // total assets
    setAssetTotal(TotalAssetsChanges);
    // liability
    const { Liabilities, EquityChanges, TotalLiabilityEquityChanges } =
      LiabilityEquity;
    const { Liability, TotalLiability } = Liabilities;
    setLiability(Liability);
    setLiabilityTotal(TotalLiability);
    // equity
    const { Equity, TotalEquity1 } = EquityChanges;
    setEquity(Equity);
    setEquityTotal(TotalEquity1);
    // total liability & changes
    setLiabiltyEquityTotal(TotalLiabilityEquityChanges);
  }, [financialPositions]);
  return (
    <div className="flex flex-col">
      {/* head */}
      <div className="mb-1">
        <div className="font-bold text-2xl text-center mb-1">
          Statement Of Financial Position
        </div>
        <div className="text-xl text-center font-bold">Josstack</div>
      </div>
      {/* body */}
      <div className="mb-2">
        {/* assets */}
        <div className="mb-2">
          <div className="text-xl font-bold mb-1">Assets</div>
          {/* current assets */}
          <div className="ms-2 mb-1">
            {/* current assets */}
            <div className="text-xl font-bold mb-1">Current Assets</div>
            <div className="flex justify-between text-xl mb-1 ms-2">
              <div>Cash </div>
              <div>{formatCurrency1(cash)}</div>
            </div>
            <div className="flex justify-between text-xl mb-1 ms-2">
              <div>Receivable </div>
              <div>{formatCurrency1(receivable)}</div>
            </div>
            <div className="flex justify-between text-xl mb-1 ms-2">
              <div>Merchandise Inventory </div>
              <div>{formatCurrency1(inventory)}</div>
            </div>
            {currentAsset.length >= 1 &&
              currentAsset.map((el, i) => (
                <div className="flex justify-between text-xl mb-1 ms-2" key={i}>
                  <div>{el.AccountingName}</div>
                  <div>{formatCurrency1(el.Total)}</div>
                </div>
              ))}
            {/* total current assets */}
            <div className="flex justify-between text-xl mb-1 font-bold">
              <div>Total Current Assets</div>
              <div>{formatCurrency1(currentAssetTotal)}</div>
            </div>
          </div>
          {/* fixed assets */}
          <div className="ms-2 mb-1">
            {/* fixed assets */}
            <div className="text-xl font-bold mb-1">Fixed Assets</div>
            {fixAsset.length >= 1 &&
              fixAsset.map((el, i) => (
                <div className="flex justify-between text-xl mb-1 ms-2" key={i}>
                  <div>{el.AccountingName}</div>
                  <div>{formatCurrency1(el.Total)}</div>
                </div>
              ))}
            {fixAssetAccm.length >= 1 &&
              fixAssetAccm.map((el, i) => (
                <div className="flex justify-between text-xl mb-1 ms-2" key={i}>
                  <div>{el.AccountingName}</div>
                  <div>{formatCurrency2(el.Total)}</div>
                </div>
              ))}
            {/* total fixed assets */}
            <div className="flex justify-between text-xl mb-1 font-bold">
              <div>Total Fixed Assets</div>
              <div>{formatCurrency1(fixAssetTotal)}</div>
            </div>
          </div>
          {/* total assets */}
          <div className="flex justify-between text-xl mb-1 font-bold">
            <div>Total Assets </div>
            <div>{formatCurrency1(assetTotal)}</div>
          </div>
        </div>
        {/* liability & equity */}
        <div className="mb-2">
          <div className="text-xl font-bold mb-1">Liability & Equity</div>
          {/* liability */}
          <div className="ms-2 mb-1">
            {/* liability */}
            <div className="text-xl font-bold mb-1">Liability</div>
            {liability.length >= 1 &&
              liability.map((el, i) => (
                <div className="flex justify-between text-xl mb-1 ms-2" key={i}>
                  <div>{el.AccountingName.split("-")[1]}</div>
                  <div>{formatCurrency1(el.TotalLiability)}</div>
                </div>
              ))}
            {/* total liability */}
            <div className="flex justify-between text-xl mb-1 font-bold">
              <div>Total Liability</div>
              <div>{formatCurrency1(liabilityTotal)}</div>
            </div>
          </div>
          {/* equity */}
          <div className="ms-2 mb-1">
            {/* Equity */}
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
          {/* total liability & equity */}
          <div className="flex justify-between text-xl mb-1 font-bold">
            <div>Total Liabilty & Equity</div>
            <div>{formatCurrency1(liabiltyEquityTotal)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatementFinancialPosition;
