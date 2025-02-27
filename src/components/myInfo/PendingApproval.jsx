import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useColors } from "@context/ColorContext";

const pendinglist = [
  {
    hotel_name: "Lotte Hotel 01",
    checkin_date: "2025-01-01",
    checkout_date: "2025-01-01",
    price: 204000,
  },
];

const PendingApproval = ({ onShowDetails }) => {
  const colors = useColors();

  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

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
        {pendinglist.map((item) => (
          <List key={item.hotel_name}>
            <TextBox>
              <HotelName>{item.hotel_name}</HotelName>
              <Date>
                {item.checkin_date} ~ {item.checkout_date}
              </Date>
            </TextBox>
            <PriceBox>
              <Price>Total Amount : ₩{item.price.toLocaleString()}</Price>
              <BtnBox>
                <Btn
                  color={colors.mainLight}
                  onClick={() => setIsPaymentOpen(true)}
                >
                  Payment
                </Btn>
                <Btn color={colors.mainLight} onClick={onShowDetails}>
                  Details
                </Btn>
              </BtnBox>
            </PriceBox>
          </List>
        ))}
      </PendingLists>

      {isPaymentOpen && (
        <PaymentWrapper onClick={() => setIsPaymentOpen(false)}>
          <PaymentModal onClick={(e) => e.stopPropagation()}>
            PG사연결
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
  gap: 2rem;
  border-bottom: 1px solid #ececec;
  padding: 1.5rem 0;

  @media screen and (max-width: 1024px) {
    gap: 1rem;
    padding: 1rem 0;
  }
`;

const TextBox = styled.div``;
const HotelName = styled.h4``;
const Date = styled.p`
  font-size: 1rem;
  color: #666;

  @media screen and (max-width: 1024px) {
    font-size: 0.9rem;
  }
`;

const PriceBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Price = styled.h3`
  @media screen and (max-width: 1440px) {
    font-size: 1.1rem;
  }

  @media screen and (max-width: 1024px) {
    font-size: 1rem;
  }
`;
const BtnBox = styled.div`
  display: flex;
  gap: 1rem;
`;
const Btn = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 2px solid #ececec;
  background-color: #ececec;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  color: #333;

  &:hover {
    border-color: ${(props) => props.color};
  }

  @media screen and (max-width: 1440px) {
    font-size: 0.8rem;
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
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
`;
