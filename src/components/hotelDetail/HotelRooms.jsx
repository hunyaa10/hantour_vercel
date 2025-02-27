import React, { useState } from "react";
import styled from "styled-components";
import CustomButton from "@components/custom/CustomButton";
import { useNavigate } from "react-router-dom";
import { useColors } from "@context/ColorContext";
import { hotelDetailData } from "@data/hotelDetailData";

import RoomImgPlaceholder from "@assets/images/Room101.jpg";
import MinusIcon from "@assets/icons/minus.svg";
import PlusIcon from "@assets/icons/plus.svg";

const HotelRooms = () => {
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

  const calculateTotalPrice = () => {
    return hotelDetailData.rooms.reduce((total, room) => {
      const count = roomCounts[room.name] || 0;
      return total + room.price * count;
    }, 0);
  };

  const handleClickRoomResercation = () => {
    const isLoggedIn = localStorage.getItem("token");

    if (!isLoggedIn) {
      alert("Please login to make a hotel reservation");
      navigate("/login");
      return;
    }

    navigate("/reservation-complete");
  };

  return (
    <RoomsContainer>
      {hotelDetailData.rooms.map((room, index) => (
        <RoomBox key={index}>
          <img src={RoomImgPlaceholder} alt={room.name} />
          <RoomInfoBox>
            <InfoScript>
              <RoomName>{room.name}</RoomName>
              <RoomBeds>{room.bedType}</RoomBeds>
              <RoomPersonnel>
                Standard for {room.standardOccupancy} Guests
                {room.maxOccupancy > room.standardOccupancy &&
                  ` (up to ${room.maxOccupancy} Guests)`}
              </RoomPersonnel>
            </InfoScript>
            <InfoPrice>
              <RoomPrice>{`₩ ${room.price.toLocaleString()}`}</RoomPrice>
              <CountBox>
                <CountBtn
                  color={colors.main}
                  onClick={() => handleChangeCount(room.name, "minus")}
                >
                  <img src={MinusIcon} alt="minus-icon" />
                </CountBtn>
                <Count>{roomCounts[room.name] || 0}</Count>
                <CountBtn
                  color={colors.main}
                  onClick={() => handleChangeCount(room.name, "plus")}
                >
                  <img src={PlusIcon} alt="plus-icon" />
                </CountBtn>
              </CountBox>
            </InfoPrice>
          </RoomInfoBox>
        </RoomBox>
      ))}

      <TotalPrice>
        Total Price: ₩ {calculateTotalPrice().toLocaleString()}
      </TotalPrice>

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
  align-items: flex-end;
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

const TotalPrice = styled.h3`
  text-align: right;
  color: #333;
  margin-top: 2rem;
`;

const Btn = styled.div`
  width: 30%;
  margin-top: 0.5rem;
`;
