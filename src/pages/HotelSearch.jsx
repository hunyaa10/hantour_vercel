"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import FilterSidebar from "@components/hotelSearch/SearchOptions";
import HotelCard from "@components/hotelReservation/HotelCard";
import hotelData from "@data/hotelData";
import CustomMainInput from "../components/custom/CustomMainInput";

const HotelSearch = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const areaFromUrl = queryParams.get("area") || "Seoul";
  const searchQuery = queryParams.get("search") || "";
  
  const [filters, setFilters] = useState({
    location: areaFromUrl,
    date: [],
    rooms: 1,
  });

  // 페이지 진입 시 스크롤을 맨 위로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // URL의 area가 변경될 때마다 필터 업데이트
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      location: areaFromUrl
    }));
  }, [areaFromUrl]);

  // 필터링 로직 수정 - region 필드 사용
  const filteredHotels = hotelData.filter(hotel => {
    const matchesLocation = filters.location === "All" 
      ? true 
      : hotel.region === filters.location || hotel.location.includes(filters.location);
    const matchesSearch = searchQuery 
      ? hotel.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesLocation && matchesSearch;
  });

  return (
    <AppContainer>
      <Main>
        <Container>
          <FilterSidebar filters={filters} setFilters={setFilters} />
          <MainColumn>
            <CustomMainInput />
            <ResultCount>
              {filteredHotels.length} hotels found
              {searchQuery && ` for "${searchQuery}"`}
              {filters.location !== "All" && ` in ${filters.location}`}
            </ResultCount>
            <HotelList>
              {filteredHotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </HotelList>
          </MainColumn>
        </Container>
      </Main>
    </AppContainer>
  );
};

// Styled Components
const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #fafafa;
`;

const Main = styled.main`
  padding: 2rem 0;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  gap: 2rem;
`;

const MainColumn = styled.div`
  flex: 1;
`;

const HotelList = styled.div`
  margin-top: 1rem;
  display: grid;
  gap: 1.5rem;
`;

const ResultCount = styled.div`
  margin: 1rem 0;
  font-size: 0.875rem;
  color: #64748b;
`;

export default HotelSearch;
