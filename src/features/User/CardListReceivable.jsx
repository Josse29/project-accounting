import React from "react";
import { CardList } from "../../components";
import { Person } from "../../assets";

const CardListReceivable = () => {
  return (
    <CardList>
      <CardList.Header className="bg-[#7b9ff9]" titleheader="Receivable" />
      <CardList.Body titleBody="Total Receivable : 10.000">
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

export default CardListReceivable;
