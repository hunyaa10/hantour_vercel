import React, { useEffect } from "react";
import styled from "styled-components";
import CustomButton from "@components/custom/CustomButton";
import { useNavigate } from "react-router-dom";
import { useColors } from "@context/ColorContext";

import CompleteImg from "@assets/images/complete.jpg";

const reservationInfo = {
  state: "booked",
  name: "Orakai Insadong Suites",
  reservation_number: 72973820281017,
  night: 1,
  adults: 2,
  child: 0,
  room_type: "One Bedroom(1)",
  check_in: {
    date: "2025-02-13",
    time: "15:00"
  },
  check_out: {
    date: "2025-02-14",
    time: "11:00"
  }
};

const ReservationComplete = () => {
  const colors = useColors();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleClickViewDetail = () => {
    navigate("/my-info/booking-history");
  };

  return (
    <Wrapper>
      <ImgContainer>
        <img src={CompleteImg} alt="complete-image" />
      </ImgContainer>

      <InfoContainer>
        <InfoTitle>
          <h2>Your reservation is Confirmed!</h2>
          <p>{reservationInfo.name}</p>
          <div>
            Reservation #<span>{reservationInfo.reservation_number}</span>
          </div>
        </InfoTitle>

        <InfoRoomBox>
          <InfoRoomName>
            <p>{reservationInfo.room_type}</p>
            <span>{reservationInfo.night}</span>
          </InfoRoomName>
          <InfoRoomDate>
            <DateCheckIn>
              <span>Check-in</span>
              <div>{new Date(reservationInfo.check_in.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })},</div>
              <div>{new Date(reservationInfo.check_in.date).getFullYear()}, {reservationInfo.check_in.time}</div>
            </DateCheckIn>
            <DateCheckOut>
              <span>Check-out</span>
              <div>{new Date(reservationInfo.check_out.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })},</div>
              <div>{new Date(reservationInfo.check_out.date).getFullYear()}, {reservationInfo.check_out.time}</div>
            </DateCheckOut>
          </InfoRoomDate>
        </InfoRoomBox>

        <BtnBox>
          <Script color={colors.sub}>
            You will receive a final approval mail for your reservation in one
            day and can make a payment.
          </Script>
          <CustomButton onClick={handleClickViewDetail}>
            View reservation details
          </CustomButton>
        </BtnBox>
      </InfoContainer>
    </Wrapper>
  );
};

export default ReservationComplete;

const Wrapper = styled.div`
  height: 62vh;
  padding: 0 20rem;
  display: flex;
  align-items: center;
  justify-content: space-around;

  @media screen and (max-width: 1512px) {
    height: 66vh;
    padding: 2rem 10rem;
  }

  @media screen and (max-width: 1280px) {
    padding: 2rem 6rem;
  }

  @media screen and (max-width: 1024px) {
    padding: 2rem 4rem;
  }
`;

const ImgContainer = styled.div`
  width: 40%;

  img {
    width: 100%;
  }

  @media screen and (max-width: 1440px) {
    width: 30%;
  }
`;

const InfoContainer = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  @media screen and (max-width: 1024px) {
    width: 35%;
  }
`;

const InfoTitle = styled.div`
  text-align: center;

  p {
    padding: 0.5rem 0;
  }
  div {
    font-weight: 600;
    font-size: 1rem;
  }

  @media screen and (max-width: 1440px) {
    font-size: 0.8rem;

    h2 {
      font-size: 1.3rem;
    }
  }
`;

const InfoRoomBox = styled.div`
  width: 100%;
`;
const InfoRoomName = styled.div`
  width: 100%;
  padding-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    font-weight: 600;
  }

  @media screen and (max-width: 1440px) {
    font-size: 0.8rem;
  }
`;
const InfoRoomDate = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const DateCheckIn = styled.div`
  width: 49%;
  padding: 1rem;
  border-radius: 0.25rem;
  background-color: #ececec;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.3rem;
  font-weight: 600;

  span {
    font-size: 1rem;
    color: #999;
  }

  @media screen and (max-width: 1440px) {
    font-size: 0.8rem;

    span {
      font-size: 0.8rem;
    }
  }
`;
const DateCheckOut = styled(DateCheckIn)`
  align-items: flex-end;
`;

const BtnBox = styled.div`
  width: 100%;
`;

const Script = styled.div`
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  color: ${(props) => props.color};
  margin-bottom: 0.5rem;

  @media screen and (max-width: 1440px) {
    font-size: 0.8rem;
  }
`;
