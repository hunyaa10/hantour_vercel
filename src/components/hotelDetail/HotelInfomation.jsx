import React, { useState } from "react";
import styled from "styled-components";
import { useColors } from "@context/ColorContext";
import PersonsOption from "../PersonsOption";
import { hotelDetailData } from "@data/hotelDetailData";

import ForwardArrow from "@assets/icons/arrow-forward.svg";
import BackArrow from "@assets/icons/arrow-back.svg";
import PinIcon from "@assets/icons/pin.svg";
import ClockIcon from "@assets/icons/clock.svg";

const hotelImages = ["1", "2", "3"];

const HotelInfomation = () => {
  const colors = useColors();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isBreakfastIncluded, setIsBreakfastIncluded] = useState(false);

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  const goToNext = () => {
    if (currentIndex < hotelImages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBreakfastChange = () => {
    setIsBreakfastIncluded((prevState) => !prevState);
  };

  return (
    <InfoWrapper>
      <ImagesContainer>
        <Images style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {hotelImages.map((img) => (
            <Image key={img}>{img}</Image>
          ))}
        </Images>
        <ArrowBox>
          <ArrowBtn onClick={goToPrevious}>
            <img src={BackArrow} alt="back-arrow" />
          </ArrowBtn>
          <ArrowBtn onClick={goToNext}>
            <img src={ForwardArrow} alt="forward-arrow" />
          </ArrowBtn>
        </ArrowBox>
      </ImagesContainer>

      <InfoContainer>
        <InfoBox>
          <Name color={colors.sub}>
            {hotelDetailData.name}
            <span>{hotelDetailData.rating}-Star</span>
          </Name>

          <Address>
            <img src={PinIcon} alt="pin-icon" />
            {hotelDetailData.address}
          </Address>

          <TimeBox>
            <img src={ClockIcon} alt="clock-icon" />
            Check-in {hotelDetailData.checkIn} | Check-out{" "}
            {hotelDetailData.checkOut}
          </TimeBox>

          <ServicesBox>
            <p>Amenities / Services</p>
            <Services>
              {hotelDetailData.amenities.map((service) => (
                <Service key={service}>{service}</Service>
              ))}
            </Services>
          </ServicesBox>
        </InfoBox>

        <SelectionBox>
          <MealLabel color={colors.main}>
            <input
              type="checkbox"
              checked={isBreakfastIncluded}
              onChange={handleBreakfastChange}
            />
            <div>
              <p>Breakfast Included</p>
              <span>
                + ₩
                {hotelDetailData.breakfastServices.breakfast.price.toLocaleString()}
              </span>
            </div>
          </MealLabel>

          <PersonsOption />
        </SelectionBox>
      </InfoContainer>
    </InfoWrapper>
  );
};

export default HotelInfomation;

const InfoWrapper = styled.div`
  width: 100%;
`;

const ImagesContainer = styled.div`
  margin: auto;
  width: 100%;
  height: 600px;
  background-color: #ccc;
  overflow: hidden;
  position: relative;

  @media screen and (max-width: 1280px) {
    width: 80%;
    height: 400px;
  }
`;
const Images = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
`;
const Image = styled.div`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  text-align: center;
  font-size: 100px;
`;
const ArrowBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
`;
const ArrowBtn = styled.button`
  padding-left: 12px;
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }

  @media screen and (max-width: 1280px) {
    padding-left: 8px;

    img {
      width: 32px;
    }
  }
`;

const InfoContainer = styled.div`
  width: 100%;
  padding: 2rem 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #ececec;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media screen and (max-width: 1280px) {
    gap: 0.5rem;
  }
`;

const Name = styled.h3`
  span {
    margin-left: 0.5rem;
    font-size: 0.9rem;
    color: ${(props) => props.color};
  }
`;
const Address = styled.div`
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  img {
    width: 24px;
  }

  @media screen and (max-width: 1440px) {
    font-size: 0.9rem;

    img {
      width: 20px;
    }
  }
`;

const TimeBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  img {
    width: 24px;
  }

  @media screen and (max-width: 1440px) {
    font-size: 0.9rem;

    img {
      width: 20px;
    }
  }
`;

const ServicesBox = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;

  @media screen and (max-width: 1280px) {
    gap: 0.5rem;
  }
`;
const Services = styled.ul`
  padding-left: 3rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem 3rem;
`;
const Service = styled.li`
  list-style: circle;
  font-size: 1rem;

  @media screen and (max-width: 1440px) {
    font-size: 0.8rem;
  }
`;

const SelectionBox = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media screen and (max-width: 1280px) {
    width: 35%;
    gap: 0.5rem;
  }
`;
const MealLabel = styled.label`
  border: 1px solid #ececec;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  input {
    width: 20px;
    height: 20px;
  }

  p {
    font-size: 1rem;
  }
  span {
    font-weight: 600;
  }

  &:hover {
    border-color: ${(props) => props.color};
  }

  @media screen and (max-width: 1440px) {
    span {
      font-size: 1rem;
    }

    p {
      font-size: 0.8rem;
    }
  }
`;
