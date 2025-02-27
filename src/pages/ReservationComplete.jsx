import React from "react";
import styled from "styled-components";
import CustomButton from "@components/custom/CustomButton";
import { useNavigate } from "react-router-dom";
import { useColors } from "@context/ColorContext";

import CompleteImg from "@assets/images/complete.jpg";

const ReservationComplete = () => {
  const colors = useColors();
  const navigate = useNavigate();

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
          <p>Lotte Hotel Seoul</p>
          <div>
            Reservation #<span>123456</span>
          </div>
        </InfoTitle>

        <InfoRoomBox>
          <InfoRoomName>
            <p>Premium Family Room</p>
            <span>1</span>
          </InfoRoomName>
          <InfoRoomDate>
            <DateCheckIn>
              <span>Check-in</span>
              <div>Thu,Feb 13,</div>
              <div>2025, 3:00 PM</div>
            </DateCheckIn>
            <DateCheckOut>
              <span>Check-out</span>
              <div>Fri,Feb 14,</div>
              <div>2025, 11:00 AM</div>
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
