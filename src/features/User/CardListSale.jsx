import React from "react";
import { Person } from "../../assets";
import { CardList } from "../../components";
import { formatCurrency1 } from "../../utils";

const CardListSale = (props) => {
  const { saleGroup, saleTotal } = props;
  return (
    <CardList>
      <CardList.Header titleheader="Sales" className="bg-[#099bda]" />
      <CardList.Body titleBody={`Total Sales : ${formatCurrency1(saleTotal)}`}>
        {saleGroup.length >= 1 &&
          saleGroup.map((el) => (
            <CardList.List
              key={el.SaleId}
              imgSrc={el.SaleImg || Person}
              listName={el.SaleName}
              listBalance={formatCurrency1(el.SaleBalance)}
            />
          ))}
      </CardList.Body>
    </CardList>
  );
};

export default CardListSale;
