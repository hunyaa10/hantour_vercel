import React from "react";
import styled from "styled-components";

import LogoIcon from "@assets/logo/logo-H.svg";
import LogoName from "@assets/logo/logo-Hantour.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <MainFooter>
      <Container>
        <FooterInner>
          <Logo>
            {/* <img src={LogoIcon} alt="logo-icon" className="logo-icon" /> */}
            <img src={LogoName} alt="logo-name" className="logo-name" />
          </Logo>
          <Script>
            <TextBox>
              <Text>
                (주) Hantour
                <br />
                대표이사: 홍길동 | 사업자등록번호: 000-00-00000
                <br />
                연락처: 010-0000-0000 | 이메일 : admin@gmail.com
              </Text>
              <Text>
                주소: 서울특별시 영등포구 의사당대로 83, 8 -112호 (여의도동,
                오투타워)
                <br />
                통신판매업자신고: 강남 - 02096호
              </Text>
            </TextBox>
          </Script>
          <Terms>
            <Term href="#a" target="_blank" rel="noopener noreferrer">
              이용약관
            </Term>
            <Term href="#a" target="_blank" rel="noopener noreferrer">
              개인정보처리방침
            </Term>
            <Term href="#a" target="_blank" rel="noopener noreferrer">
              사업자정보
            </Term>
          </Terms>

          {/* 작업을 위한 관리자 버튼 */}
          <Link to={"/admin"}>
            <Admin>관리자</Admin>
          </Link>
        </FooterInner>
      </Container>
    </MainFooter>
  );
};

export default Footer;

const MainFooter = styled.footer`
  width: 100%;
  padding: 3rem 0;
  background-color: #262626;
  color: #ffffff;
  font-size: 0.8rem;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const FooterInner = styled.div`
  width: 100%;
  height: fit-content;
  position: relative;
`;

const Admin = styled.div`
  width: fit-content;
  background-color: #474747;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  position: absolute;
  right: 0;
  bottom: 0;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #555;
    font-weight: 600;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;

  .logo-icon {
    width: 24px;
    filter: brightness(0) invert(1);
  }
  .logo-name {
    width: 80px;
    filter: brightness(0) invert(1);
  }

  @media screen and (max-width: 1440px) {
    .logo-icon {
      width: 20px;
    }
    .logo-name {
      width: 70px;
    }
  }
  @media screen and (max-width: 1024px) {
    .logo-icon {
      width: 16px;
    }
    .logo-name {
      width: 60px;
    }
  }
`;

const Script = styled.div`
  padding: 0.75rem 0;
  margin-bottom: 1.5rem;

  @media screen and (max-width: 1440px) {
    padding: 0.5rem 0;
  }
`;

const TextBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  @media screen and (max-width: 1512px) {
    gap: 10rem;
  }

  @media screen and (max-width: 1280px) {
    gap: 8rem;
  }
`;

const Text = styled.p`
  letter-spacing: 0.5px;
  line-height: 2;
  color: #cccccc;
`;

const Terms = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Term = styled.a`
  color: #ffffff;
  border: 1px solid #555;
  padding: 6px 12px;
  font-size: 0.7rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;
