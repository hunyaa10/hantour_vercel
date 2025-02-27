import React from "react";
import styled from "styled-components";
import { MinusCircle, PlusCircle } from "react-feather";

const RoomFilter = ({ rooms = 1, setRooms }) => {
  const handleIncrement = () => {
    if (rooms < 10) setRooms(rooms + 1);
  };

  const handleDecrement = () => {
    if (rooms > 1) setRooms(rooms - 1);
  };

  return (
    <FilterSection>
      <Label>Rooms</Label>
      <FilterButton>
        <NumberBox>
          <IconButton onClick={handleDecrement} disabled={rooms <= 1}>
            <MinusCircle size={16} />
          </IconButton>
          <Number>
            {rooms} Room{rooms > 1 ? "s" : ""}
          </Number>
          <IconButton onClick={handleIncrement} disabled={rooms >= 10}>
            <PlusCircle size={16} />
          </IconButton>
        </NumberBox>
      </FilterButton>
    </FilterSection>
  );
};

export default RoomFilter;

// Styled Components
const FilterSection = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #222;
`;

const FilterButton = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.75rem;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  transition: border-color 0.2s;
  color: #222;

  &:hover {
    border-color: #2563eb;
  }
`;

const NumberBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border: none;
  background: none;
  color: #222;
  cursor: pointer;
  transition: all 0.2s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    color: #2563eb;
  }
`;

const Number = styled.div`
  font-size: 0.875rem;
  color: #222;
`;
