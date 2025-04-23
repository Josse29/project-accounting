import React from "react";
import { Person } from "../../assets";
import { CardList } from "../../components";

const CardListSale = () => {
  return (
    <CardList>
      <CardList.Header titleheader="Sales" className="bg-[#099bda]" />
      <CardList.Body titleBody="Total Sales : 10.000">
        <CardList.List
          imgSrc={Person}
          listName="John Doe"
          listBalance="$1200"
        />
        <CardList.List
          imgSrc={Person}
          listName="John Doe"
          listBalance="$1200"
        />
        <CardList.List
          imgSrc={Person}
          listName="John Doe"
          listBalance="$1200"
        />
        <CardList.List
          imgSrc={Person}
          listName="John Doe"
          listBalance="$1200"
        />
        <CardList.List
          imgSrc={Person}
          listName="John Doe"
          listBalance="$1200"
        />
      </CardList.Body>
    </CardList>
  );
};

export default CardListSale;
