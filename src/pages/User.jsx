import React from "react";
import { NavigationContainer } from "../navigation";
import { Card1, Container } from "../components";
import { FaUsers } from "react-icons/fa";
import { CardUser } from "../features/User";

const User = () => {
  return (
    <NavigationContainer>
      <Card1 page="User" icon={<FaUsers />} className="border-[#4338ca]" />
      <Container>
        <CardUser />
      </Container>
    </NavigationContainer>
  );
};

export default User;
