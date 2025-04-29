import { useEffect, useState } from "react";
import { createContext } from "react";
import { getFinancialStatementAPI } from "../services";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";
export const AllContext = createContext();
export const AllProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState({});
  const [totalRows, setTotalRows] = useState(0);
  const [financialPositions, setFinancialPositions] = useState({});
  const [changesEquity, setChangesEquity] = useState({});
  const [profitOrLoss, setProfitOrLoss] = useState({});
  const getFinancialStatement = async () => {
    try {
      const response = await getFinancialStatementAPI();
      const { TotalRow, FinancialPosition, ChangesInEquity, ProfitOrLoss } =
        response;
      setTotalRows(TotalRow);
      setFinancialPositions(FinancialPosition);
      setChangesEquity(ChangesInEquity);
      setProfitOrLoss(ProfitOrLoss);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const keyUser = JSON.parse(localStorage.getItem("verifyToken"));
  useEffect(() => {
    if (!keyUser) {
      navigate("/");
    } else {
      const data = jwtDecode(keyUser);
      setUserLogin(data);
    }
  }, [navigate]);
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
        userLogin,
        setUserLogin,
      }}
    >
      {children}
    </AllContext.Provider>
  );
};
