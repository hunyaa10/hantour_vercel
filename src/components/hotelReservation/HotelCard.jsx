import React from "react";
import styled from "styled-components";
import { MapPin } from "react-feather";
import { useNavigate } from "react-router-dom";
import HotelRoom from "./HotelRoom";

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();
  const { name, stars, location, rating, reviews, images, amenities, rooms } = hotel;

  const handleClick = () => {
    navigate(`/hotel-detail/${encodeURIComponent(name)}`);
  };

  return (
    <HotelCardWrapper onClick={handleClick}>
      <HotelImageContainer>
        <HotelImage src={images.main} alt={name} />
        <StarBadge>{stars}-Star</StarBadge>
      </HotelImageContainer>

      <HotelInfo>
        <TopSection>
          <HotelHeader>
            <HotelName>{name}</HotelName>
            <HotelRating>
              <span>★</span>
              <span>{rating}</span>
              {/* <ReviewCount>({reviews} reviews)</ReviewCount> */}
            </HotelRating>
          </HotelHeader>

          <HotelLocation>
            <MapPin size={16} />
            {location}
          </HotelLocation>

          <AmenitiesList>
            {amenities.slice(0, 3).map((amenity, index) => (
              <AmenityBadge key={index}>{amenity}</AmenityBadge>
            ))}
          </AmenitiesList>
        </TopSection>

        <Separator />

        <BottomSection>
          <RoomList>
            {rooms.map((room, index) => (
              <HotelRoom key={index} room={room} />
            ))}
          </RoomList>
        </BottomSection>
      </HotelInfo>
    </HotelCardWrapper>
  );
};

// Styled Components
const HotelCardWrapper = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 1rem;
  background-color: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const HotelImageContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 250px;
  overflow: hidden;
`;

const HotelImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  position: absolute;
  top: 0;
  left: 0;
`;

const StarBadge = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  background-color: #2563eb;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
`;

const HotelInfo = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const HotelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const HotelName = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
  color: #222;
`;

const HotelRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: 600;
  color: #222;
`;

const ReviewCount = styled.span`
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 400;
`;

const HotelLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: #64748b;
`;

const AmenitiesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const AmenityBadge = styled.span`
  background-color: #f0f0f0;
  color: #222;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
`;

const Separator = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 1rem 0;
`;

const RoomList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export default HotelCard;
