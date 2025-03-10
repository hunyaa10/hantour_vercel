import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useColors } from "@context/ColorContext";
import LuggageIcon from "@assets/icons/luggage.svg";

const PendingApproval = ({ booking, onShowDetails }) => {
  const colors = useColors();
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  if (!booking) {
    return (
      <Wrapper>
        <NoReservation>No pending reservations found.</NoReservation>
      </Wrapper>
    );
  }

  const calculateTotalPrice = () => {
    const roomTotal = booking.one_night_price * booking.night;
    const breakfastTotal = parseInt(booking.breakfast.price.replace(',', '')) * booking.adults;
    const tax = Math.floor(roomTotal * 0.1);
    return roomTotal + breakfastTotal + tax;
  };

  useEffect(() => {
    if (isPaymentOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isPaymentOpen]);

  return (
    <Wrapper>
      <PendingLists>
        <List>
          <TextBox>
            <HotelNameWrapper>
              <IconWrapper>
                <img src={LuggageIcon} alt="luggage-icon" />
              </IconWrapper>
              <HotelName>{booking.name}</HotelName>
            </HotelNameWrapper>
            <InfoRow>
              <Date>
                {booking.check_in.split(',')[0]} - {booking.check_out.split(',')[0]}
              </Date>
              <ReservationNumber>
                #{booking.reservation_number}
              </ReservationNumber>
            </InfoRow>
          </TextBox>
          <PriceBox>
            <Price>
              Total Amount: <span>₩{calculateTotalPrice().toLocaleString()}</span>
            </Price>
            <BtnBox>
              <Btn
                $color={colors.mainLight}
                onClick={() => setIsPaymentOpen(true)}
              >
                Payment
              </Btn>
              <Btn $color={colors.mainLight} onClick={onShowDetails}>
                Details
              </Btn>
            </BtnBox>
          </PriceBox>
        </List>
      </PendingLists>

      {isPaymentOpen && (
        <PaymentWrapper onClick={() => setIsPaymentOpen(false)}>
          <PaymentModal onClick={(e) => e.stopPropagation()}>
            Payment Gateway
          </PaymentModal>
        </PaymentWrapper>
      )}
    </Wrapper>
  );
};

export default PendingApproval;

const Wrapper = styled.div``;

const PendingLists = styled.ul``;

const List = styled.li`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid #ececec;

  @media screen and (max-width: 1024px) {
    gap: 1rem;
    padding: 1rem 0;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const HotelNameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const IconWrapper = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #f8f8f8;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 18px;
    height: 18px;
    opacity: 0.6;
  }
`;

const HotelName = styled.h4`
  font-size: 1.2rem;
  color: #333;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666;
`;

const Date = styled.p`
  font-size: 0.95rem;

  @media screen and (max-width: 1024px) {
    font-size: 0.9rem;
  }
`;

const ReservationNumber = styled.p`
  font-size: 0.9rem;
  font-weight: 500;
`;

const PriceBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid #ececec;
`;

const Price = styled.h3`
  font-size: 1rem;
  color: #666;
  
  span {
    font-size: 1.2rem;
    color: #333;
    font-weight: 600;
    margin-left: 0.5rem;
  }

  @media screen and (max-width: 1024px) {
    font-size: 0.9rem;
    
    span {
      font-size: 1.1rem;
    }
  }
`;

const BtnBox = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const Btn = styled.button`
  padding: 0.6rem 1.2rem;
  border-radius: 0.5rem;
  border: none;
  background-color: #f8f8f8;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.$color};
  }

  @media screen and (max-width: 1440px) {
    font-size: 0.8rem;
    padding: 0.5rem 1rem;
  }
`;

const PaymentWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PaymentModal = styled.div`
  width: 500px;
  height: 500px;
  background-color: #fff;
  border-radius: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
`;

const NoReservation = styled.p`
  color: #666;
  font-size: 1.1rem;
  text-align: center;
  
  @media screen and (max-width: 1440px) {
    font-size: 1rem;
  }
`;
