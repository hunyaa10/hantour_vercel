import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useColors } from "@context/ColorContext";

import UserIcon from "@assets/icons/user.svg";
import ClipboardIcon from "@assets/icons/clipboard.svg";
import ArrowIcon from "@assets/icons/arrow-forward-dark.svg";
import CoinIcon from "@assets/icons/coins-stack.svg";

const MenuItems = [
  {
    id: "myinfo",
    icon: UserIcon,
    title: "Edit My Info",
    description: "View and Edit My Info",
  },
  {
    id: "booking",
    icon: ClipboardIcon,
    title: "Booking History",
    description: "View All Reservations and Payment Details",
  },
];

const Nav = ({ activeMenu, userInfo }) => {
  const colors = useColors();
  const navigate = useNavigate();

  const isAdmin = userInfo.email_name === "admin@example.com";
  const displayName = isAdmin ? "admin" : userInfo.first_name || "User";

  return (
    <NavContainer>
      <Header $colors={colors}>
        <Title>Hello, {displayName}!</Title>
        <Email>{userInfo.email_name}</Email>
      </Header>

      <MenuList>
        {MenuItems.map((item) => (
          <MenuItem
            key={item.id}
            $active={activeMenu === item.id}
            $colors={colors}
            onClick={() =>
              navigate(
                item.id === "myinfo"
                  ? "/my-info/edit"
                  : item.id === "booking"
                  ? "/my-info/booking-history"
                  : "/my-info/my-point"
              )
            }
          >
            <img src={item.icon} alt={`${item.id}-icon`} />
            <MenuItemContent>
              <span>{item.title}</span>
              <span>{item.description}</span>
            </MenuItemContent>
            <img src={ArrowIcon} alt="arrow-icon" className="arrow-icon" />
          </MenuItem>
        ))}
      </MenuList>

      <PointSection onClick={() => navigate("/my-info/my-point")}>
        <PointTitle $colors={colors}>
          <img src={CoinIcon} alt="coin-icon" />
          My Point
        </PointTitle>
        <PointValue $colors={colors}>
          {userInfo.point} P
          <img src={ArrowIcon} alt="arrow-icon" className="arrow-icon" />
        </PointValue>
      </PointSection>
    </NavContainer>
  );
};

export default Nav;

const NavContainer = styled.div`
  width: 380px;
  flex-shrink: 0;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  height: fit-content;
`;

const Header = styled.div`
  padding: 1.5rem;
  background: ${props => props.$colors.main};
  color: white;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Email = styled.p`
  font-size: 0.875rem;
  opacity: 0.8;
`;

const MenuList = styled.div`
  padding: 1rem 0;
  max-height: 320px;
  overflow-y: auto;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
  position: relative;

  ${({ $active, $colors }) =>
    $active &&
    `
    background-color: #f3f4f6;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background-color: ${$colors.main};
    }
  `}

  &:hover {
    background-color: #f3f4f6;
  }

  img {
    width: 24px;
    height: 24px;
  }

  .arrow-icon {
    margin-left: auto;
    width: 20px;
    height: 20px;
    opacity: 0.6;
  }
`;

const MenuItemContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.5rem;
  
  span:first-of-type {
    font-weight: 500;
  }

  span:last-of-type {
    font-size: 0.75rem;
    color: #6b7280;
    margin-top: 0.25rem;
  }
`;

const PointSection = styled.div`
  padding: 1rem 1.5rem;
  background-color: #f3f4f6;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #e5e7eb;
  }
`;

const PointTitle = styled.h2`
  font-size: 0.875rem;
  color: #4b5563;
  display: flex;
  align-items: center;

  img {
    width: 20px;
    height: 20px;
    margin-right: 0.5rem;
  }

  &:hover {
    color: ${props => props.$colors.main};
  }
`;

const PointValue = styled.p`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${props => props.$colors.main};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .arrow-icon {
    width: 20px;
    height: 20px;
    opacity: 0.6;
  }
`;
