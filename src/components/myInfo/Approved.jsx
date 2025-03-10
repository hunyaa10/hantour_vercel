import React from "react";
import styled from "styled-components";
import { useColors } from "@context/ColorContext";

const Approved = ({ onShowDetails }) => {
  const colors = useColors();

  return (
    <Wrapper>
      <NoReservation>No reservations found.</NoReservation>
    </Wrapper>
  );
};

export default Approved;

const Wrapper = styled.div`
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoReservation = styled.p`
  color: #888;
  font-size: 1.1rem;
  padding-top: 100px;
  
  @media screen and (max-width: 1440px) {
    font-size: 1rem;
  }
`;
