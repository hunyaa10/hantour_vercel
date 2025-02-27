import Nav from "@components/myInfo/Nav";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import { pointHistoryData } from "@data/pointHistoryData";
import { useColors } from "@context/ColorContext";

const MyInfo = () => {
  const location = useLocation();
  const colors = useColors();
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    company_name: "",
    email_name: "",
  });

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    const isAdmin = userInfo.email === "admin@example.com";

    setUserData({
      first_name: isAdmin ? "admin" : userInfo.firstName || "user",
      last_name: isAdmin ? "admin" : userInfo.lastName || "user",
      company_name: userInfo.companyName || "company",
      email_name: userInfo.email || "user@gmail.com",
    });
  }, []);

  const totalPoints = pointHistoryData.reduce((sum, history) => {
    return sum + history.points;
  }, 0);

  const activeMenu = location.pathname.includes("booking-history")
    ? "booking"
    : location.pathname.includes("my-point")
    ? "my-point"
    : "myinfo";

  return (
    <Wrapper>
      <Nav
        activeMenu={activeMenu}
        userInfo={{ ...userData, point: totalPoints }}
      />
      <ContentsWrapper>
        <Outlet context={{ point: totalPoints }} />
      </ContentsWrapper>
    </Wrapper>
  );
};

export default MyInfo;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  gap: 2rem;

  @media screen and (max-width: 1024px) {
    padding: 2rem;
  }
`;

const ContentsWrapper = styled.div`
  flex: 1;
`;
