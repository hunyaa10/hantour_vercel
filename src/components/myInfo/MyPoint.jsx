import React, { useState } from "react";
import styled from "styled-components";
import { useColors } from "@context/ColorContext";
import { useOutletContext } from "react-router-dom";
import CustomButton from "@components/custom/CustomButton";
import PaybackModal from "@components/myInfo/PaybackModal";
import { pointHistoryData } from "@data/pointHistoryData";

import CoinIcon from "@assets/icons/coins-stack.svg";

const MyPoint = () => {
  const colors = useColors();
  const { point } = useOutletContext();

  const [isPaybackModalOpen, setIsPaybackModalOpen] = useState(false);
  const [paybackHistory, setPaybackHistory] = useState([]);

  const totalPoints =
    pointHistoryData.reduce((sum, history) => {
      return sum + history.points;
    }, 0) -
    paybackHistory.reduce((sum, history) => {
      return sum + history.amount;
    }, 0);

  const allHistory = [...pointHistoryData, ...paybackHistory].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const handlePayback = () => {
    setIsPaybackModalOpen(true);
  };

  const handlePaybackComplete = (amount) => {
    const newPayback = {
      id: Date.now(),
      date: new Date()
        .toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\s/g, "")
        .slice(0, -1),
      amount: amount,
      type: "payback",
      status: "Pending",
    };
    setPaybackHistory([newPayback, ...paybackHistory]);
  };

  return (
    <Wrapper>
      <Title>My Point</Title>
      <PointContainer>
        <PointBox>
          <PointHeader>
            <img src={CoinIcon} alt="coin-icon" />
            <h4>Available Points</h4>
          </PointHeader>

          <PointAmountBox>
            <PointAmount>{totalPoints} P</PointAmount>
            <PaybackBtn>
              <CustomButton onClick={handlePayback} padding={"0.75rem"}>
                Payback
              </CustomButton>
            </PaybackBtn>
          </PointAmountBox>

          <PointAmountScript color={colors.sub}>
            Payback is available from 100,000 points.
          </PointAmountScript>
        </PointBox>

        <HistoryContainer>
          <h4>Point History</h4>
          {allHistory.length > 0 ? (
            <HistoryList>
              {allHistory.map((history) => (
                <HistoryItem key={history.id}>
                  <HistoryDate>{history.date}</HistoryDate>
                  <HistoryHotel>
                    {history.hotelName || "Point Payback"}
                  </HistoryHotel>
                  {history.type === "payback" ? (
                    <HistoryAmount color={colors.red}>
                      -{history.amount} P
                    </HistoryAmount>
                  ) : (
                    <HistoryAmount color={colors.main}>
                      +{history.points} P
                      {/* <HistoryPrice>(₩{history.amount})</HistoryPrice> */}
                    </HistoryAmount>
                  )}
                  {/* <HistoryStatus color={colors.sub}>
                    {history.status}
                  </HistoryStatus> */}
                </HistoryItem>
              ))}
            </HistoryList>
          ) : (
            <EmptyHistory>No point history available.</EmptyHistory>
          )}
        </HistoryContainer>
      </PointContainer>

      {isPaybackModalOpen && (
        <PaybackModal
          setIsPaybackModalOpen={setIsPaybackModalOpen}
          totalPoints={point}
          onPaybackComplete={handlePaybackComplete}
        />
      )}
    </Wrapper>
  );
};

export default MyPoint;

const Wrapper = styled.div`
  width: 100%;
  height: calc(90vh - 4rem);
  border: 2px solid #ececec;
  border-radius: 0.5rem;
  padding: 2rem 1rem;
  position: relative;

  @media screen and (max-width: 1024px) {
    height: calc(92vh - 4rem);
    padding: 1rem 1rem;
  }
`;
const Title = styled.h3`
  @media screen and (max-width: 1024px) {
    font-size: 1rem;
  }
`;

const PointContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;

  @media screen and (max-width: 1280px) {
    margin-top: 1rem;
  }

  @media screen and (max-width: 1024px) {
    gap: 1rem;
  }
`;

const PointBox = styled.div`
  padding: 1.5rem;
  border: 2px solid #ececec;
  border-radius: 0.5rem;

  @media screen and (max-width: 1024px) {
    padding: 1rem;
  }
`;

const PointHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;

  img {
    width: 24px;
  }

  h4 {
    font-size: 1.1rem;
    font-weight: 600;
  }

  @media screen and (max-width: 1440px) {
    img {
      width: 20px;
    }
    h4 {
      font-size: 1rem;
    }
  }

  @media screen and (max-width: 1280px) {
    margin-bottom: 0.5rem;
  }
`;

const PointAmountBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const PointAmount = styled.div`
  font-size: 1.8rem;
  font-weight: 700;

  @media screen and (max-width: 1440px) {
    font-size: 1.5rem;
  }

  @media screen and (max-width: 1024px) {
    font-size: 1.3rem;
  }
`;
const PaybackBtn = styled.div`
  width: 150px;

  @media screen and (max-width: 1440px) {
    width: 100px;
  }
`;

const PointAmountScript = styled.p`
  margin-top: 1rem;
  font-size: 1rem;
  text-align: center;
  color: ${(props) => props.color};

  @media screen and (max-width: 1440px) {
    font-size: 0.8rem;
  }
`;

const HistoryContainer = styled.div`
  h4 {
    margin-bottom: 1rem;
  }
`;

const EmptyHistory = styled.div`
  text-align: center;
  padding: 2rem;
  color: #999;
  border: 2px solid #ececec;
  border-radius: 0.5rem;

  @media screen and (max-width: 1024px) {
    padding: 1rem;
  }
`;

const HistoryList = styled.div`
  padding: 0 1rem;
  border: 2px solid #ececec;
  border-radius: 0.5rem;
  overflow-y: auto;
`;

const HistoryItem = styled.div`
  padding: 1rem 0;
  display: grid;
  grid-template-columns: 1fr 2.5fr 1.5fr;
  align-items: center;
  border-bottom: 1px solid #ececec;
  text-align: center;

  &:last-child {
    border-bottom: none;
  }
`;

const HistoryDate = styled.span`
  font-size: 0.9rem;
  color: #666;

  @media screen and (max-width: 1024px) {
    font-size: 0.8rem;
  }
`;

const HistoryHotel = styled.span`
  font-size: 1rem;

  @media screen and (max-width: 1024px) {
    font-size: 0.9rem;
  }
`;

const HistoryAmount = styled.span`
  font-weight: 600;
  color: ${(props) => props.color};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
`;

const HistoryPrice = styled.span`
  font-size: 0.8rem;
  color: #666;
  font-weight: 500;
`;

const HistoryStatus = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${(props) => props.color};

  @media screen and (max-width: 1024px) {
    font-size: 0.8rem;
  }
`;
