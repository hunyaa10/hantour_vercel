import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useColors } from "@context/ColorContext";
import { Link, useNavigate, useLocation } from "react-router-dom";

import LogoIcon from "@assets/logo/logo-H.svg";
import LogoName from "@assets/logo/logo-Hantour.svg";

const Header = () => {
  const colors = useColors();
  const navigate = useNavigate();
  const location = useLocation();

  const isAdminPage = location.pathname.includes("/admin");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      // 쿠키 체크 함수
      const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
        return null;
      };

      // 로컬 스토리지 토큰 체크
      const token = localStorage.getItem("accessToken");
      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

      // 구글 로그인 쿠키 체크
      const jsessionId = getCookie("JSESSIONID");
      const userEmail = getCookie("user_email");
      const userRole = getCookie("user_role");

      if (token || jsessionId) {
        setIsLoggedIn(true);
        setIsAdmin(
          userInfo.email === "admin@example.com" ||
            userEmail === "admin@example.com" ||
            userRole === "ADMIN"
        );
      } else {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    };

    // 초기 체크
    checkLoginStatus();

    // 주기적으로 체크 (쿠키/로컬스토리지 변경 감지)
    const intervalId = setInterval(checkLoginStatus, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = () => {
    try {
      // 모든 인증 관련 쿠키 제거
      const cookies = [
        "JSESSIONID",
        "refresh_token",
        "user_email",
        "user_role",
      ];
      cookies.forEach((cookieName) => {
        document.cookie = `${cookieName}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
      });

      // 로컬 스토리지 데이터 삭제
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userInfo");

      // 상태 초기화
      setIsLoggedIn(false);
      setIsAdmin(false);

      // 로그인 페이지로 이동
      navigate("/login");
    } catch (error) {
      console.error("로그아웃 에러:", error);
      alert("Failed to logout. Please try again.");
    }
  };

  return (
    <HeaderWrapper $isAdmin={isAdminPage}>
      <HeaderContainer $isAdmin={isAdminPage}>
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            textDecoration: "none",
          }}
        >
          <Logo>
            <img src={LogoName} alt="logo-name" className="logo-name" />
          </Logo>
        </Link>

        <Nav>
          <Link to="/hotel-search?area=All">
            <NavLink color={colors.main}>Hotel Reservation</NavLink>
          </Link>
          <Link to="/my-info">
            <NavLink color={colors.main}>My Info</NavLink>
          </Link>
          {isLoggedIn ? (
            <Button
              $variant="default"
              $size="sm"
              color={colors.main}
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button $variant="default" $size="sm" color={colors.main}>
                Login
              </Button>
            </Link>
          )}

            <Link to="/admin">
              <NavLink color={colors.main}>Admin</NavLink>
            </Link>
          
        </Nav>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  border-bottom: 1px solid #e5e7eb;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
`;

const Container = styled.div`
  width: 100%;
  max-width: ${props => props.$isAdmin ? '100%' : '1400px'};
  margin: 0 auto;
  padding: 0 2rem;
`;

const HeaderContainer = styled(Container)`
  display: flex;
  height: 4rem;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .logo-name {
    width: 120px;
    height: auto;
  }

  @media screen and (max-width: 1024px) {
    .logo-name {
      width: 100px;
    }
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const NavLink = styled.ul`
  font-size: 0.875rem;
  font-weight: 500;
  color: #000000;
  text-decoration: none;

  &:hover {
    color: #0070f3;
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
    props.$size === "sm"
      ? "0.5rem 1rem"
      : props.$size === "icon"
      ? "0.5rem"
      : "0.75rem 1.5rem"};
  background-color: ${(props) =>
    props.$variant === "default" ? "#0070f3" : "transparent"};
  color: ${(props) => (props.$variant === "default" ? "white" : "#0070f3")};
  border: ${(props) =>
    props.$variant === "default" ? "none" : "1px solid #0070f3"};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;
