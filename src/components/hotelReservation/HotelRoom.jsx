import React from "react";
import styled from "styled-components";

const HotelRoom = ({ room }) => (
  <RoomItem>
    <RoomType>{room.type}</RoomType>
    <RoomDetails>
      <RoomPrice>₩ {room.price.weekday}</RoomPrice>
    </RoomDetails>
  </RoomItem>
);

// Styled Components
const RoomItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 0.375rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f8f8f8;
  }
`;

const RoomType = styled.span`
  font-weight: 500;
  color: #222;
`;

const RoomDetails = styled.div`
  text-align: right;
`;

const RoomPrice = styled.div`
  font-weight: 600;
  color: #2563eb;
`;


export default HotelRoom;
