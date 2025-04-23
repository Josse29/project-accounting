import { useState } from "react";
import { createContext } from "react";
import { getFinancialStatementAPI } from "../services";

export const AllContext = createContext();
export const AllProvider = ({ children }) => {
  const [totalRows, setTotalRows] = useState(0);
  const [financialPositions, setFinancialPositions] = useState({});
  const [changesEquity, setChangesEquity] = useState({});
  const [profitOrLoss, setProfitOrLoss] = useState({});
  const getFinancialStatement = async () => {
    try {
      const response = await getFinancialStatementAPI();
      const {
        TotalRow = 0,
        FinancialPosition = {},
        ChangesInEquity = {},
        ProfitOrLoss = {},
      } = response;
      setTotalRows(TotalRow);
      setFinancialPositions(FinancialPosition);
      setChangesEquity(ChangesInEquity);
      setProfitOrLoss(ProfitOrLoss);
    } catch (error) {
      throw error;
    }
  };
  return (
    <AllContext.Provider
      value={{
        getFinancialStatement,
        totalRows,
        setTotalRows,
        financialPositions,
        setFinancialPositions,
        changesEquity,
        setChangesEquity,
        profitOrLoss,
        setProfitOrLoss,
      }}
    >
      {children}
    </AllContext.Provider>
  );
};
