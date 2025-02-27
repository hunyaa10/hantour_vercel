import React, { useState } from "react";
import styled from "styled-components";
import { useColors } from "@context/ColorContext";

// SearchIcon 컴포넌트 추가
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

const CustomSearchbar = ({ placeholder, onSearch, className }) => {
  const colors = useColors();
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchValue);
    }
    setSearchValue("");
  };

  return (
    <Wrapper className={className}>
      <SearchInputWrapper>
        <Input
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <SearchButton onClick={handleSubmit} type="button">
          <SearchIcon />
        </SearchButton>
      </SearchInputWrapper>
    </Wrapper>
  );
};

export default CustomSearchbar;

const Wrapper = styled.form`
  width: 60%;
  position: relative;
`;

const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
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

const SearchButton = styled.button`
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #333333;
  }
`;
