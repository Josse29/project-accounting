import React, { useEffect, useState } from "react";
import { CardList } from "../../components";
import { Person } from "../../assets";
import { getInvestor1API } from "../../services";
import { formatCurrency, formatCurrency1 } from "../../utils";

const CardListInvestor = () => {
  const [totalInvest, setTotalInvest] = useState(0);
  const [investor, setInvestor] = useState([]);
  const getInvestor = async () => {
    try {
      const response = await getInvestor1API();
      const { investorList, investorTotal } = response;
      setInvestor(investorList);
      setTotalInvest(investorTotal);
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    getInvestor();
  }, []);
  return (
    <CardList>
      <CardList.Header className="bg-blue-500" titleheader="Investor" />
      <CardList.Body
        titleBody={`Total Invest : ${formatCurrency1(totalInvest)}`}
      >
        {investor.length >= 1 &&
          investor.map((el, i) => (
            <CardList.List
              key={i}
              imgSrc={el.InvestorImg || Person}
              listName={el.Investorname}
              listBalance={el.InvestorEquity}
            />
          ))}
      </CardList.Body>
    </CardList>
  );
};

export default CardListInvestor;
