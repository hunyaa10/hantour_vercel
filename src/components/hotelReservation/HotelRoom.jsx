import React from "react";
import styled from "styled-components";
import CustomMainInput from "@components/custom/CustomMainInput";

const HotelRoom = ({ room }) => (
  <RoomItem>
    <RoomType>{room.type}</RoomType>
    <RoomDetails>
      <RoomPrice>₩ {room.price}</RoomPrice>
      {/* {room.perks && (
        <PerkList>
          {room.perks.map((perk, index) => (
            <Perk key={index}>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              {perk}
            </Perk>
          ))}
        </PerkList>
      )} */}
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

const PerkList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
  margin-top: 0.25rem;
`;

const Perk = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: #2563eb;
`;

export default HotelRoom;
