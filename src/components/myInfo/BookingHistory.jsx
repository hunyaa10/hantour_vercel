import React, { useState } from "react";
import styled from "styled-components";
import PendingApproval from "./PendingApproval";
import Approved from "./Approved";
import ReservationDetails from "./ReservationDetails";
import OrakaiHotelSub from "@assets/images/orakaiHotel/orakai-sub.jpg";

import XIcon from "@assets/icons/x-mark.svg";

const bookingData = {
  pending: {
    state: "pending",
    name: "Orakai Insadong Suites",
    reservation_number: 72973820281017,
    night: 2,
    adults: 2,
    child: 0,
    room_type: "One Bedroom(1)",
    check_in: "2025-02-18, 16:00",
    check_out: "2025-02-20, 11:00",
    address: "8, Insadong 4-gil, Jongno-Gu, 03163 Seoul, Republic of Korea",
    one_night_price: 240000,
    tax: 12300,
    payment_method: "Visa Card",
    images: {
      sub: OrakaiHotelSub,
    },
    phone: "02-6262-8888",
    amenities: [
      "Free Wi-Fi",
      "Parking",
      "Indoor Swimming Pool",
      "Sauna & Steam Room",
      "Gymnasium",
      "Children's Playroom"
    ],
    breakfast: {
      available: true,
      price: "18,000"
    },
    cancellationPolicy: "Free cancellation is available up to 14 days before check-in date."
  },
  approved: null
};

const BookingHistory = () => {
  const [activeMenu, setActiveMenu] = useState("pending");
  const [showDetails, setShowDetails] = useState(false);
  const [reservationState, setReservationState] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);

  const menuItems = [
    { label: "Pending Approval", value: "pending" },
    { label: "Approved", value: "approved" },
  ];

  const handleShowDetails = (state) => {
    setReservationState(state);
    setSelectedBooking(bookingData[state]);
    setShowDetails(true);
  };

  return (
    <Wrapper className="booking-wrapper">
      {showDetails && (
        <DetailsWrapper>
          <ReservationDetails state={reservationState} booking={selectedBooking} />
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
          <PendingApproval 
            booking={bookingData.pending} 
            onShowDetails={() => handleShowDetails("pending")} 
          />
        ) : (
          <Approved onShowDetails={() => handleShowDetails("approved")} />
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
