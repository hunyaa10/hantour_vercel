import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import hotelData from "@data/hotelData";
import HotelInfomation from "@components/hotelDetail/HotelInfomation";
import HotelLocation from "@components/hotelDetail/HotelLocation";
import HotelReview from "@components/hotelDetail/HotelReview";
import HotelRooms from "@components/hotelDetail/HotelRooms";

const HotelDetail = () => {
  const { hotelName } = useParams();
  const hotel = hotelData.find(h => h.name === decodeURIComponent(hotelName));
  const [breakfastPrice, setBreakfastPrice] = useState(0);
  const [totalPersons, setTotalPersons] = useState(2);

  const handleBreakfastChange = (price) => {
    setBreakfastPrice(price);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!hotel) {
    return <div>Hotel not found</div>;
  }

  return (
    <Wrapper>
      <HotelInfomation 
        hotel={hotel} 
        onBreakfastChange={handleBreakfastChange}
        onPersonsChange={setTotalPersons}
      />
      <HotelRooms 
        hotel={hotel} 
        breakfastPrice={breakfastPrice}
        totalPersons={totalPersons}
      />
      <HotelLocation hotel={hotel} />
      <HotelReview hotel={hotel} />
    </Wrapper>
  );
};

export default HotelDetail;

const Wrapper = styled.div`
  padding: 2rem 20rem;

  @media screen and (max-width: 1512px) {
    padding: 2rem 10rem;
  }

  @media screen and (max-width: 1280px) {
    padding: 2rem 6rem;
  }

  @media screen and (max-width: 1024px) {
    padding: 2rem 4rem;
  }
`;
