import React from "react";
import styled from "styled-components";
import { hotelDetailData } from "@data/hotelDetailData";

import PinIcon from "@assets/icons/pin.svg";
import BusIcon from "@assets/icons/bus-trip.svg";

const HotelLocation = () => {
  return (
    <LocationContainer>
      <Title>Location</Title>
      <Location>
        <img src={PinIcon} alt="pin-icon" />
        {hotelDetailData.address}
      </Location>
      {/* 구글맵 연결 */}
      <Map />

      {/* 일일버스투어 관광지목록 */}
      <DayTourContainer>
        <TourTitle>
          <img src={BusIcon} alt="bus-icon" />
          Daily Tour Picks
        </TourTitle>
        <TourAttractionLists>
          {hotelDetailData.nearbyAttractions.map((attraction) => (
            <AttractionList key={attraction}>{attraction}</AttractionList>
          ))}
        </TourAttractionLists>
      </DayTourContainer>
    </LocationContainer>
  );
};

export default HotelLocation;

const LocationContainer = styled.div`
  padding: 2rem 0;
`;

const Title = styled.h3`
  width: 100%;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #ececec;
`;
const Location = styled.div`
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  img {
    width: 24px;
  }

  @media screen and (max-width: 1280px) {
    img {
      width: 20px;
    }
  }
`;

const Map = styled.div`
  width: 100%;
  height: 50vh;
  border-radius: 0.5rem;
  background-color: #ccc;
`;

const DayTourContainer = styled.div``;
const TourTitle = styled.h5`
  margin: 1rem 0 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;

  img {
    width: 20px;
  }
`;
const TourAttractionLists = styled.ul`
  padding-left: 2rem;
`;
const AttractionList = styled.li`
  font-size: 1rem;
  list-style: circle;
  padding: 0.5rem 0;
`;
