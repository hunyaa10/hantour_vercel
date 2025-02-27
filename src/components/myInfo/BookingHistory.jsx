import React, { useState } from "react";
import styled from "styled-components";
import PendingApproval from "./PendingApproval";
import Approved from "./Approved";
import ReservationDetails from "./ReservationDetails";

import XIcon from "@assets/icons/x-mark.svg";

const BookingHistory = () => {
  const [activeMenu, setActiveMenu] = useState("pending");
  const [showDetails, setShowDetails] = useState(false);
  const [reservationState, setReservationState] = useState("");

  const menuItems = [
    { label: "Pending Approval", value: "pending" },
    { label: "Approved", value: "approved" },
  ];

  const handleShowDetails = (state) => {
    setReservationState(state);
    setShowDetails(true);
  };

  return (
    <Wrapper className="booking-wrapper">
      {showDetails && (
        <DetailsWrapper>
          <ReservationDetails state={reservationState} />
          <CloseButton onClick={() => setShowDetails(false)}>
            <img src={XIcon} alt="x-icon" />
          </CloseButton>
        </DetailsWrapper>
      )}

      <Menus>
        {menuItems.map((item) => (
          <Menu
            key={item.value}
            onClick={() => setActiveMenu(item.value)}
            $isactive={activeMenu === item.value}
          >
            {item.label}
          </Menu>
        ))}
      </Menus>

      <BookingContainer>
        {activeMenu === "pending" ? (
          <PendingApproval onShowDetails={() => handleShowDetails("pending")} />
        ) : (
          <Approved onShowDetails={() => handleShowDetails("booked")} />
        )}
      </BookingContainer>
    </Wrapper>
  );
};

export default BookingHistory;

const Wrapper = styled.div`
  width: 100%;
  height: calc(90vh - 4rem);
  border: 2px solid #ececec;
  border-radius: 0.5rem;
  position: relative;
  overflow-y: auto;
  overscroll-behavior: contain;

  @media screen and (max-width: 1024px) {
    height: calc(92vh - 4rem);
  }
`;

const Menus = styled.div`
  width: 100%;
  border-bottom: 1px solid #ececec;
  display: flex;
`;
const Menu = styled.div`
  width: 50%;
  text-align: center;
  padding: 1rem;
  cursor: pointer;
  color: ${(props) => (props.$isactive ? "#333" : "#999")};
  font-weight: ${(props) => (props.$isactive ? "700" : "500")};

  &:first-child {
    border-right: 2px solid #ececec;
  }
`;

const BookingContainer = styled.div`
  padding: 0 1.5rem;
  padding-bottom: 2rem;
`;

const DetailsWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 0.5rem;
  padding: 2rem;
  z-index: 10;

  @media screen and (max-width: 1280px) {
    padding: 1.5rem;
  }

  @media screen and (max-width: 1280px) {
    padding: 1.2rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;

  @media screen and (max-width: 1280px) {
    top: 0.75rem;
    right: 0.75rem;
  }

  @media screen and (max-width: 1024px) {
    top: 0.5rem;
    right: 0.5rem;
  }
`;
