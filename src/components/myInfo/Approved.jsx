import React from "react";
import styled from "styled-components";
import { useColors } from "@context/ColorContext";

const approvedlist = [
  {
    hotel_name: "Lotte Hotel 01",
    checkin_date: "2025-01-01",
    checkout_date: "2025-01-01",
    price: 204000,
  },
  {
    hotel_name: "Lotte Hotel 02",
    checkin_date: "2025-01-01",
    checkout_date: "2025-01-01",
    price: 204000,
  },
];

const Approved = ({ onShowDetails }) => {
  const colors = useColors();

  return (
    <Wrapper>
      <ApprovedLists>
        {approvedlist.map((item) => (
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
                <Btn color={colors.mainLight} onClick={onShowDetails}>
                  Details
                </Btn>
              </BtnBox>
            </PriceBox>
          </List>
        ))}
      </ApprovedLists>
    </Wrapper>
  );
};

export default Approved;

const Wrapper = styled.div`
  height: 100%;
  overflow: hidden;
`;

const ApprovedLists = styled.ul``;
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
