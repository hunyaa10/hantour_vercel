import React, { useState } from "react";
import styled from "styled-components";
import { useColors } from "@context/ColorContext";
import SearchIcon from "@assets/icons/search-glass.svg";

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
    <SearchWrapper onSubmit={handleSubmit} className={className}>
      <IconContainer>
        <img src={SearchIcon} alt="search-icon" />
      </IconContainer>
      <Input
        type="text"
        placeholder={placeholder}
        $borderColor={colors.main}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </SearchWrapper>
  );
};

export default CustomSearchbar;

const SearchWrapper = styled.form`
  position: relative;
  width: 60%;
`;

const IconContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 0.75rem;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;

  img {
    width: 100%;
    height: 100%;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  padding-left: 2.5rem;
  margin: 0;
  margin-top: 0.25rem;
  border: 2px solid ${(props) => props.$borderColor};
  border-radius: 0.5rem;
  background-color: #fff;
  color: #333;
  font-size: 1.2rem;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #666;
    font-size: 1rem;
  }

  @media screen and (max-width: 1440px) {
    font-size: 1rem;
    &::placeholder {
      font-size: 0.8rem;
    }
  }
`;
