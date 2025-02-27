import React from "react";
import styled from "styled-components";
import { useColors } from "@context/ColorContext";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { attractionMockData } from "@data/attractionMockData";

import NextArrowIcon from "@assets/icons/arrow-forward-dark.svg";
import PrevArrowIcon from "@assets/icons/arrow-back-dark.svg";

const DayTripLists = () => {
  const colors = useColors();

  const PrevArrow = ({ onClick, className }) => {
    return (
      <ArrowButton
        onClick={onClick}
        style={{ left: "-10px" }}
        className="prev-arrow"
      >
        <img src={PrevArrowIcon} alt="prev-arrow" />
      </ArrowButton>
    );
  };

  const NextArrow = ({ onClick, className }) => {
    return (
      <ArrowButton
        onClick={onClick}
        style={{ right: "-10px" }}
        className="next-arrow"
      >
        <img src={NextArrowIcon} alt="next-arrow" />
      </ArrowButton>
    );
  };

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    centerMode: false,
    dots: false,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <SectionWrapper>
      <Container>
        <SectionTitle>Day Trip</SectionTitle>
        <SliderWrapper>
          <SliderContainer>
            <Slider {...sliderSettings}>
              {attractionMockData.map((attraction) => (
                <div key={attraction.attractionName}>
                  <CardLink as={Link} to={``}>
                    <CardImage $imageUrl={attraction.imageURL || "/placeholder.svg"}>
                      <CardOverlay />
                      <CardTitle>
                        <p>{attraction.attractionName}</p>
                        <p style={{ fontSize: "0.8em", opacity: 0.8 }}>
                          {attraction.openTime} - {attraction.closeTime}
                        </p>
                        <p style={{ fontSize: "0.8em", opacity: 0.8 }}>
                          ${attraction.price}
                        </p>
                      </CardTitle>
                    </CardImage>
                  </CardLink>
                </div>
              ))}
            </Slider>
          </SliderContainer>
        </SliderWrapper>
      </Container>
    </SectionWrapper>
  );
};

export default DayTripLists;

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SectionWrapper = styled.section`
  padding: 2rem 0rem;
  border-radius: 1rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #000000;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;

  &:hover {
    background-color: #f9fafb;
    opacity: 1;
  }

  img {
    width: 20px;
    height: 20px;
  }
`;

const SliderWrapper = styled.div`
  position: relative;
  width: 100%;

  &:hover ${ArrowButton} {
    opacity: 0.9;
  }
`;

const SliderContainer = styled.div`
  position: relative;
  width: 100%;

  .slick-track {
    display: flex;
  }

  .slick-slide {
    padding: 0 0.25rem;
  }

  .slick-list {
    overflow: hidden;
  }

  .slick-slider {
    position: relative;
  }
`;

const CardLink = styled.a`
  position: relative;
  display: block;
  width: 100%;
  height: 0;
  padding-bottom: 140%;  // 1:1.4 비율
  border-radius: 0.5rem;
  overflow: hidden;
  text-decoration: none;
`;

const CardImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.$imageUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: transform 0.3s ease;

  ${CardLink}:hover & {
    transform: scale(1.05);
  }
`;

const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
`;

const CardTitle = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  z-index: 1;
`;
