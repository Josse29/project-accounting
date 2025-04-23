import React from "react";
import { CardList } from "../../components";
import { Person } from "../../assets";

const CardListLiability = () => {
  return (
    <CardList>
      <CardList.Header className="bg-blue-500" titleheader="Liability" />
      <CardList.Body titleBody="Total Liability : 10.000">
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

export default CardListLiability;
