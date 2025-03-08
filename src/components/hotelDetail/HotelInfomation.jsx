import React, { useState } from "react";
import styled from "styled-components";
import { useColors } from "@context/ColorContext";
import PersonsOption from "../PersonsOption";
import ImageSlideModal from "./ImageSlideModal";

import PinIcon from "@assets/icons/pin.svg";
import ClockIcon from "@assets/icons/clock.svg";

const HotelInfomation = ({ hotel, onBreakfastChange, onPersonsChange }) => {
  const colors = useColors();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isBreakfastIncluded, setIsBreakfastIncluded] = useState(false);
  const [totalPersons, setTotalPersons] = useState(2); // 기본값 2명

  const allImages = [
    { src: hotel.images.main, label: 'Main View' },
    ...(hotel.images.facilities ? 
      Object.entries(hotel.images.facilities).map(([key, value]) => ({
        src: value,
        label: key.charAt(0).toUpperCase() + key.slice(1)
      })) 
      : []
    )
  ];

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? allImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleBreakfastChange = () => {
    const newValue = !isBreakfastIncluded;
    setIsBreakfastIncluded(newValue);
    const breakfastPrice = Number(hotel.breakfast.price.replace(/,/g, ''));
    onBreakfastChange?.(newValue ? breakfastPrice * totalPersons : 0);
  };

  const handlePersonsChange = (persons) => {
    setTotalPersons(persons);
    onPersonsChange?.(persons);
    if (isBreakfastIncluded) {
      const breakfastPrice = Number(hotel.breakfast.price.replace(/,/g, ''));
      onBreakfastChange?.(breakfastPrice * persons);
    }
  };

  return (
    <InfoWrapper>
      <MainImageContainer 
        bgImage={hotel.images.main} 
        onClick={() => setIsModalOpen(true)}
      >
        <ImageOverlay>
          <ViewAllPhotos>View All Photos</ViewAllPhotos>
        </ImageOverlay>
      </MainImageContainer>

      <InfoContainer>
        <InfoBox>
          <Name color={colors.sub}>
            {hotel.name}
            <span>{hotel.stars}-Star</span>
          </Name>

          <Address>
            <img src={PinIcon} alt="pin-icon" />
            {hotel.address}
          </Address>

          <TimeBox>
            <img src={ClockIcon} alt="clock-icon" />
            Check-in {hotel.checkIn} | Check-out {hotel.checkOut}
          </TimeBox>

          <ServicesBox>
            <p>Amenities / Services</p>
            <Services>
              {hotel.amenities.map((service) => (
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
                + ₩{hotel.breakfast.price}
              </span>
            </div>
          </MealLabel>
          <PersonsOption onPersonsChange={handlePersonsChange} />
        </SelectionBox>
      </InfoContainer>

      {isModalOpen && (
        <ImageSlideModal 
          images={allImages} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </InfoWrapper>
  );
};

export default HotelInfomation;

const InfoWrapper = styled.div`
  width: 100%;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const MainImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  cursor: pointer;
  overflow: hidden;
  background-image: url(${props => props.bgImage});
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;

  &:hover {
    ${ImageOverlay} {
      opacity: 1;
    }
  }

  @media screen and (max-width: 1280px) {
    height: 400px;
  }
`;

const ViewAllPhotos = styled.div`
  color: white;
  font-size: 1.2rem;
  font-weight: 500;
  padding: 12px 24px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.5);
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
