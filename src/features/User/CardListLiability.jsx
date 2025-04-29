import React, { useEffect, useState } from "react";
import { CardList } from "../../components";
import { Person } from "../../assets";
import { getLiabilityAPI } from "../../services";
import { formatCurrency1 } from "../../utils";

const CardListLiability = () => {
  const [liability, setLiability] = useState([]);
  const [liabilityTotal, setLiabilityTotal] = useState(0);
  const getLiability = async () => {
    try {
      const response = await getLiabilityAPI();
      const { liabilityList, liabilityTotal } = response;
      setLiabilityTotal(liabilityTotal);
      setLiability(liabilityList);
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    getLiability();
  }, []);
  return (
    <CardList>
      <CardList.Header className="bg-blue-500" titleheader="Liability" />
      <CardList.Body
        titleBody={`Total Liability : ${formatCurrency1(liabilityTotal)}`}
      >
        {liability.length >= 1 &&
          liability.map((el, i) => (
            <CardList.List
              key={i}
              imgSrc={el.UserImg || Person}
              listName={el.UserFullname}
              listBalance={formatCurrency1(el.TotalLiability)}
            />
          ))}
      </CardList.Body>
    </CardList>
  );
};

export default CardListLiability;
