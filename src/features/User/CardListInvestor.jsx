import React from "react";
import { CardList } from "../../components";
import { Person } from "../../assets";

const CardListInvestor = () => {
  return (
    <CardList>
      <CardList.Header className="bg-blue-500" titleheader="Investor" />
      <CardList.Body titleBody="Total Invest : 10.000">
        <CardList.List
          imgSrc={Person}
          listName="John Doe fdsfsdfdsfsdfsdfsdfdsdsdsd"
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

export default CardListInvestor;
