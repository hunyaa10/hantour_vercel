import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import LocationFilter from "@components/hotelSearch/optionDetail/AreaOption";
import DateFilter from "@components/hotelSearch/optionDetail/DateOption";
import RoomFilter from "@components/hotelSearch/optionDetail/RoomOption";

// 기본값 설정으로 문제 해결
const FilterSidebar = ({
  filters = { location: "Seoul", date: [], rooms: 1 },
  setFilters,
}) => {
  // 기본 setFilters 함수 제공하여 undefined 오류 방지
  const handleFilterChange =
    setFilters || (() => console.warn("setFilters is not provided"));

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentSearch = queryParams.get("search") || "";

  const handleClickCompleteBtn = () => {
    // 현재 검색어를 유지하면서 area만 업데이트
    const newParams = new URLSearchParams();
    if (currentSearch) newParams.set("search", currentSearch);
    if (filters.location) newParams.set("area", filters.location);
    
    navigate({
      pathname: "/hotel-search",
      search: newParams.toString()
    });
  };

  return (
    <SidebarColumn>
      <Card>
        <CardHeader>
          <CardTitle>Search Hotel</CardTitle>
        </CardHeader>
        <CardContent>
          <LocationFilter
            selectedLocation={filters.location}
            setSelectedLocation={(location) =>
              handleFilterChange({ ...filters, location })
            }
          />
          <DateFilter
            date={filters.date}
            setDate={(date) => handleFilterChange({ ...filters, date })}
          />
          <RoomFilter
            rooms={filters.rooms}
            setRooms={(rooms) => handleFilterChange({ ...filters, rooms })}
          />
        </CardContent>
        <CardFooter>
          <SearchButton onClick={handleClickCompleteBtn}>Search Hotels</SearchButton>
        </CardFooter>
      </Card>
    </SidebarColumn>
  );
};

export default FilterSidebar;

// Styled Components
const SidebarColumn = styled.div`
  width: 380px;
  flex-shrink: 0;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const CardHeader = styled.div`
  background-color: #f8f8f8;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: #222;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardFooter = styled.div`
  background-color: #f8f8f8;
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
`;

const SearchButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2b2b2b;
  }
`;
