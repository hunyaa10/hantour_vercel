import React, { useState } from "react";
import styled from "styled-components";
import { useColors } from "@context/ColorContext";
import { useLocation, useNavigate } from "react-router-dom";

import FilterOffIcon from "@assets/icons/filter-off.svg";

// SearchIcon 컴포넌트
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const CustomMainInput = () => {
  const colors = useColors();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const currentSearch = queryParams.get("search") || "";

  const [inputValue, setInputValue] = useState(currentSearch);

  const handleSearch = (e) => {
    e.preventDefault(); // 폼 기본 동작 방지
    console.log("Search initiated with term:", inputValue);
    
    if (inputValue.trim()) {
      navigate({
        pathname: "/hotel-search",
        search: `?search=${encodeURIComponent(inputValue.trim())}`,
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  const handleFilterOff = () => {
    console.log("Filter turned off");
    setInputValue("");
    navigate({
      pathname: "/hotel-search",
      search: "",
    });
  };

  return (
    <Wrapper>
      <SearchInputWrapper>
        <Input
          type="text"
          placeholder="Search for hotel name"
          $borderColor={colors.main}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <SearchButton onClick={handleSearch} type="button" size="icon">
          <SearchIcon />
        </SearchButton>
      </SearchInputWrapper>

      <FilterOffWrapper>
        {currentSearch && (
          <IconBox onClick={handleFilterOff}>
            <img src={FilterOffIcon} alt="filter-off-icon" />
            <p>filter off</p>
          </IconBox>
        )}
      </FilterOffWrapper>
    </Wrapper>
  );
};

export default CustomMainInput;

const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const FilterOffWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  height: 3rem;
  padding: 0 3.5rem 0 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  background-color: white;
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: #0070f3;
    box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.2);
  }
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  padding: ${(props) =>
    props.size === "sm"
      ? "0.5rem 1rem"
      : props.size === "icon"
      ? "0.5rem"
      : "0.75rem 1.5rem"};
  background-color: ${(props) =>
    props.variant === "default" ? "#0070f3" : "transparent"};
  color: ${(props) => (props.variant === "default" ? "white" : "#0070f3")};
  border: ${(props) =>
    props.variant === "default" ? "none" : "1px solid #0070f3"};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const SearchButton = styled(Button)`
  position: absolute;
  right: 0.25rem;
  top: 50%;
  transform: translateY(-50%);
  height: 2.5rem;
  width: 2.5rem;
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 0.25rem;

  &:hover {
    background-color: #333333;
  }
`;

const IconBox = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  cursor: pointer;
  opacity: 0.7;
  background: none;
  border: none;
  padding: 0;

  img {
    width: 24px;
  }

  &:hover {
    opacity: 1;
  }
`;
