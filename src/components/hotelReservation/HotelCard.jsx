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
      <HotelInfo>
        <TopSection>
          <HotelHeader>
            <HotelNameSection>
              <HotelName>{name}</HotelName>
              <StarsWrapper>
                {[...Array(stars)].map((_, index) => (
                  <Star key={index}>★</Star>
                ))}
              </StarsWrapper>
            </HotelNameSection>
            <HotelRating>
              <RatingScore>★ {rating}</RatingScore>
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
  width: 100%;
  background-color: white;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid #e5e7eb;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
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
  padding: 1.75rem;
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const HotelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const HotelNameSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const HotelName = styled.h3`
  font-size: 1.35rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

const StarsWrapper = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
`;

const Star = styled.span`
  color: #fbbf24;
  font-size: 1.1rem;
`;

const HotelRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #f8fafc;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
`;

const RatingScore = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: 600;
  color: #1a1a1a;
  
  span {
    color: #fbbf24;
  }
`;

const ReviewCount = styled.span`
  font-size: 0.875rem;
  color: #64748b;
`;

const HotelLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  color: #4b5563;

  svg {
    color: #6b7280;
  }
`;

const AmenitiesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
  margin-top: 0.5rem;
`;

const AmenityBadge = styled.span`
  background-color: #f1f5f9;
  color: #475569;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.5rem 0.875rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e2e8f0;
  }
`;

const Separator = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 1.5rem 0;
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const RoomList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export default HotelCard;
