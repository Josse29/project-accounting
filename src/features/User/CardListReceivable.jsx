import React, { useEffect, useState } from "react";
import { CardList } from "../../components";
import { Person } from "../../assets";
import { getReceivable1API } from "../../services";
import { formatCurrency1 } from "../../utils";

const CardListReceivable = () => {
  const [receivable, setReceivable] = useState([]);
  const [receivableTotal, setReceivableTotal] = useState(0);
  const getReceivable = async () => {
    try {
      const response = await getReceivable1API();
      const { receivableList, receivableTotal } = response;
      setReceivable(receivableList);
      setReceivableTotal(receivableTotal);
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    getReceivable();
  }, []);
  return (
    <CardList>
      <CardList.Header className="bg-[#7b9ff9]" titleheader="Receivable" />
      <CardList.Body
        titleBody={`Total Receivable : ${formatCurrency1(receivableTotal)}`}
      >
        {receivable.length >= 1 &&
          receivable.map((el, i) => (
            <CardList.List
              key={i}
              imgSrc={el.UserImg || Person}
              listName={el.UserFullname}
              listBalance={formatCurrency1(el.TotalReceivable)}
            />
          ))}
      </CardList.Body>
    </CardList>
  );
};

export default CardListReceivable;
