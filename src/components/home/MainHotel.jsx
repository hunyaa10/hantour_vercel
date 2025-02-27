import React from "react";
import styled from "styled-components";
import LocationLists from "@components/home/LocationLists";
import ThemeLists from "@components/home/ThemeLists";
import DayTripLists from "@components/home/DayTripLists";

const MainHotel = () => {
  return (
    <MainWrapper>
      {/* 위치 리스트 */}
      <LocationLists />

      <DayTripLists />
      
      {/* 호텔 테마 리스트 */}
      <ThemeLists />
    </MainWrapper>
  );
};

export default MainHotel;

const MainWrapper = styled.div`
  margin-top: 0.8rem;
`;
