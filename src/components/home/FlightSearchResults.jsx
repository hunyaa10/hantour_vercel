import React, { useState } from "react";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  max-width: 64rem;
  margin: 0 auto;
  padding: 1rem;
  font-family: sans-serif;
`;

const Header = styled.div`
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  overflow-x: auto;
`;

const TabButton = styled.button`
  padding: 0.5rem 1.5rem;
  white-space: nowrap;
  color: ${(props) => (props.active ? "#3b82f6" : "#4b5563")};
  border-bottom: ${(props) => (props.active ? "2px solid #3b82f6" : "none")};
  font-weight: ${(props) => (props.active ? "600" : "400")};
`;

const FlightGrid = styled.div`
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FlightCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

const AirlineInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
`;

const AirlineLogo = styled.img`
  margin-right: 0.25rem;
`;

const JejuAirline = styled.div`
  display: flex;
  align-items: center;
  color: #f97316;
  font-weight: 500;
  margin-right: 0.5rem;
`;

const ThaiAirline = styled.div`
  display: flex;
  align-items: center;
  color: #ef4444;
  font-weight: 500;
  margin-right: 0.5rem;
`;

const EconomyLabel = styled.span`
  font-size: 0.75rem;
  color: #6b7280;
  margin-left: auto;
`;

const FlightTimes = styled.div`
  font-size: 1.125rem;
  font-weight: 700;
`;

const FlightRoute = styled.div`
  font-size: 0.875rem;
  color: #4b5563;
`;

const Divider = styled.div`
  border-top: 1px solid #e5e7eb;
  margin: 0.5rem 0;
`;

const PriceContainer = styled.div`
  margin-top: 1rem;
  text-align: right;
`;

const Price = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e3a8a;
`;

const PriceSubtext = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
`;

const Footer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ViewAllButton = styled.button`
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 9999px;
  font-weight: 500;

  &:hover {
    background-color: #2563eb;
  }
`;

const TermsLink = styled.a`
  color: #3b82f6;
  font-size: 0.875rem;
  text-decoration: none;
`;

const FlightSection = styled.div`
  margin-bottom: ${(props) => (props.isReturn ? "0" : "1rem")};
`;

const FlightSearchResults = () => {
  const [activeTab, setActiveTab] = useState("후쿠오카");

  const tabs = ["후쿠오카", "타이베이", "오사카", "도쿄", "제주시", "나고야"];

  const flightData = [
    {
      id: 1,
      airline: "타이항공",
      departureTime: "14:45",
      arrivalTime: "16:15",
      origin: "서울 (ICN)",
      destination: "후쿠오카 (FUK)",
      returnDepartureTime: "12:45",
      returnArrivalTime: "14:15",
      returnOrigin: "후쿠오카 (FUK)",
      returnDestination: "서울 (ICN)",
      price: 206970,
      isJeju: false,
    },
    {
      id: 2,
      airline: "제주항공",
      departureTime: "15:20",
      arrivalTime: "16:55",
      origin: "서울 (ICN)",
      destination: "후쿠오카 (FUK)",
      returnDepartureTime: "12:50",
      returnArrivalTime: "14:20",
      returnOrigin: "후쿠오카 (FUK)",
      returnDestination: "서울 (ICN)",
      price: 211700,
      isJeju: true,
    },
    {
      id: 3,
      airline: "타이항공",
      departureTime: "10:10",
      arrivalTime: "11:35",
      origin: "서울 (ICN)",
      destination: "후쿠오카 (FUK)",
      returnDepartureTime: "12:45",
      returnArrivalTime: "14:15",
      returnOrigin: "후쿠오카 (FUK)",
      returnDestination: "서울 (ICN)",
      price: 215770,
      isJeju: false,
    },
    {
      id: 4,
      airline: "제주항공",
      departureTime: "16:20",
      arrivalTime: "17:55",
      origin: "서울 (ICN)",
      destination: "후쿠오카 (FUK)",
      returnDepartureTime: "12:50",
      returnArrivalTime: "14:20",
      returnOrigin: "후쿠오카 (FUK)",
      returnDestination: "서울 (ICN)",
      price: 229700,
      isJeju: true,
    },
  ];

  return (
    <Container>
      <Header>
        <Title>인기 여행지의 항공편 보기</Title>
        <Subtitle>왕복 항공편 표시: 3월 17일 ~ 3월 19일</Subtitle>
      </Header>

      {/* 탭 메뉴 */}
      <TabContainer>
        {tabs.map((tab) => (
          <TabButton
            key={tab}
            active={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </TabButton>
        ))}
      </TabContainer>

      {/* 항공편 목록 */}
      <FlightGrid>
        {flightData.map((flight) => (
          <FlightCard key={flight.id}>
            {/* 출국 항공편 */}
            <FlightSection>
              <AirlineInfo>
                {flight.isJeju ? (
                  <JejuAirline>
                    <AirlineLogo
                      src="/api/placeholder/20/20"
                      alt="Jeju Air Logo"
                    />
                    제주항공
                  </JejuAirline>
                ) : (
                  <ThaiAirline>
                    <AirlineLogo
                      src="/api/placeholder/20/20"
                      alt="Thai Air Logo"
                    />
                    타이항공, 수하물 포함
                  </ThaiAirline>
                )}
                <EconomyLabel>이코노미</EconomyLabel>
              </AirlineInfo>

              <FlightTimes>
                {flight.departureTime} - {flight.arrivalTime}
              </FlightTimes>
              <FlightRoute>
                {flight.origin} - {flight.destination}
              </FlightRoute>
            </FlightSection>

            <Divider />

            {/* 귀국 항공편 */}
            <FlightSection isReturn>
              <AirlineInfo>
                {flight.isJeju ? (
                  <JejuAirline>
                    <AirlineLogo
                      src="/api/placeholder/20/20"
                      alt="Jeju Air Logo"
                    />
                    제주항공
                  </JejuAirline>
                ) : (
                  <ThaiAirline>
                    <AirlineLogo
                      src="/api/placeholder/20/20"
                      alt="Thai Air Logo"
                    />
                    타이항공, 수하물 포함
                  </ThaiAirline>
                )}
                <EconomyLabel>이코노미</EconomyLabel>
              </AirlineInfo>

              <FlightTimes>
                {flight.returnDepartureTime} - {flight.returnArrivalTime}
              </FlightTimes>
              <FlightRoute>
                {flight.returnOrigin} - {flight.returnDestination}
              </FlightRoute>
            </FlightSection>

            {/* 가격 */}
            <PriceContainer>
              <Price>₩{flight.price.toLocaleString()}</Price>
              <PriceSubtext>1인당 왕복 요금</PriceSubtext>
            </PriceContainer>
          </FlightCard>
        ))}
      </FlightGrid>

      {/* 하단 버튼 */}
      <Footer>
        <ViewAllButton>항공편 모두 보기</ViewAllButton>
        <TermsLink href="#">이용약관이 적용됩니다.</TermsLink>
      </Footer>
    </Container>
  );
};

export default FlightSearchResults;
