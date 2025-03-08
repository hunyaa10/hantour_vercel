import React, { useState } from "react";
import styled from "styled-components";
import CustomButton from "@components/custom/CustomButton";
import { useNavigate } from "react-router-dom";
import { useColors } from "@context/ColorContext";

import MinusIcon from "@assets/icons/minus.svg";
import PlusIcon from "@assets/icons/plus.svg";

const HotelRooms = ({ hotel, breakfastPrice, totalPersons }) => {
  const colors = useColors();
  const navigate = useNavigate();
  const [roomCounts, setRoomCounts] = useState({});

  const handleChangeCount = (roomName, type) => {
    setRoomCounts((prevCounts) => {
      const currentCount = prevCounts[roomName] || 0;
      let newCount = currentCount;
      if (type === "plus") {
        newCount = currentCount < 5 ? currentCount + 1 : 5;
      } else if (type === "minus" && currentCount > 0) {
        newCount = currentCount - 1;
      }
      return {
        ...prevCounts,
        [roomName]: newCount,
      };
    });
  };

  const calculateRoomsTotal = () => {
    return hotel.rooms.reduce((total, room) => {
      const count = roomCounts[room.type] || 0;
      const price = Number(room.price.weekday.replace(/,/g, ''));
      return total + (price * count);
    }, 0);
  };

  const calculateTotalPrice = () => {
    return calculateRoomsTotal() + breakfastPrice;
  };

  const handleClickRoomResercation = () => {
    // const isLoggedIn = localStorage.getItem("token");

    // if (!isLoggedIn) {
    //   alert("Please login to make a hotel reservation");
    //   navigate("/login");
    //   return;
    // }

    navigate("/reservation-complete");
  };

  return (
    <RoomsContainer>
      {breakfastPrice > 0 && (
        <BreakfastInfo>
          <InfoTitle>Breakfast</InfoTitle>
          <PriceBox>
            <Price>₩{(hotel.breakfast.price).toLocaleString()}</Price>
            <PriceDetail>× {totalPersons} persons = ₩{breakfastPrice.toLocaleString()}</PriceDetail>
          </PriceBox>
        </BreakfastInfo>
      )}

      <RoomsSection>
        {hotel.rooms.map((room, index) => (
          <RoomBox key={index}>
            <img src={hotel.images.room} alt={room.type} />
            <RoomInfoBox>
              <InfoScript>
                <RoomName>{room.type}</RoomName>
                <RoomBeds>{room.bedType}</RoomBeds>
                <RoomPersonnel>Standard for {room.defaultCapacity} Guests</RoomPersonnel>
              </InfoScript>
              <InfoPrice>
                <RoomPrice>
                  ₩{Number(room.price.weekday.replace(/,/g, '')).toLocaleString()} 
                </RoomPrice>
                <CountBox>
                  <CountBtn
                    color={colors.main}
                    onClick={() => handleChangeCount(room.type, "minus")}
                  >
                    <img src={MinusIcon} alt="minus-icon" />
                  </CountBtn>
                  <Count>{roomCounts[room.type] || 0}</Count>
                  <CountBtn
                    color={colors.main}
                    onClick={() => handleChangeCount(room.type, "plus")}
                  >
                    <img src={PlusIcon} alt="plus-icon" />
                  </CountBtn>
                </CountBox>
              </InfoPrice>
            </RoomInfoBox>
          </RoomBox>
        ))}
      </RoomsSection>

      <TotalPriceBox>
        <PriceDetail>
          Rooms Total: ₩{calculateRoomsTotal().toLocaleString()}
        </PriceDetail>
        {breakfastPrice > 0 && (
          <PriceDetail>
            Breakfast Total: ₩{breakfastPrice.toLocaleString()}
          </PriceDetail>
        )}
        <TotalPrice>
          Total Price: ₩{calculateTotalPrice().toLocaleString()}
        </TotalPrice>
      </TotalPriceBox>

      <Btn>
        <CustomButton
          padding={"0.75rem 0"}
          onClick={handleClickRoomResercation}
        >
          Room Reservation
        </CustomButton>
      </Btn>
    </RoomsContainer>
  );
};

export default HotelRooms;

const RoomsContainer = styled.div`
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const RoomBox = styled.div`
  width: 100%;
  padding: 1rem 0;
  display: flex;
  gap: 2rem;
  border-bottom: 1px solid #ececec;

  img {
    width: 250px;
  }

  @media screen and (max-width: 1280px) {
    img {
      width: 200px;
    }
  }
`;

const RoomInfoBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InfoScript = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const RoomName = styled.h3``;
const RoomBeds = styled.div`
  font-size: 1rem;
`;
const RoomPersonnel = styled.div`
  font-size: 1rem;
`;

const InfoPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const RoomPrice = styled.h3`
  text-align: end;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
`;
const CountBox = styled.div`
  display: flex;
  align-items: center;
`;
const CountBtn = styled.button`
  border: 2px solid #dfdfdf;
  padding: 2px;

  img {
    width: 16px;
    height: 16px;
  }

  &:hover {
    border-color: ${(props) => props.color};
  }
`;

const Count = styled.div`
  width: 50px;
  text-align: center;
  font-size: 1.2rem;

  @media screen and (max-width: 1440px) {
    width: 40px;
    font-size: 1rem;
  }
`;

const TotalPriceBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const PriceDetail = styled.span`
  font-size: 0.9rem;
  color: #666;
  font-weight: normal;
`;

const TotalPrice = styled.h3`
  text-align: right;
  color: #333;
  margin-top: 1rem;
`;

const Btn = styled.div`
  width: 30%;
  margin-top: 1rem;
  margin-left: auto;
`;

const BreakfastInfo = styled.div`
  width: 100%;
  padding: 1rem 0;
  border-bottom: 1px solid #ececec;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InfoTitle = styled.h3`
  color: #333;
`;

const PriceBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Price = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
`;

const RoomsSection = styled.div`
  display: flex;
  flex-direction: column;
`;
