import React from "react";
import styled from "styled-components";
import CustomMainInput from "@components/custom/CustomMainInput";

const HeroSection = ({ backgroundImage }) => {
  return (
    <HeroSectionWrapper>
      <Container>
        <HeroContent $backgroundImage={backgroundImage}>
          <GradientOverlay />
          <HeroTextContainer>
            <HeroTitle>Discover <br/> Korea&apos;s Finest Hotels</HeroTitle>
            {/* <HeroSubtitle>
              Experience luxury and comfort across South Korea&apos;s most
              beautiful destinations
            </HeroSubtitle> */}
            
            <SearchContainer>
              <CustomMainInput />
            </SearchContainer>
          </HeroTextContainer>
        </HeroContent>
      </Container>
    </HeroSectionWrapper>
  );
};

export default HeroSection;

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const HeroSectionWrapper = styled.section`
  position: relative;
  height: 500px;
  width: 100%;
  overflow: hidden;
`;

const HeroContent = styled.div`
  position: relative;
  padding: 6rem 0 8rem;
  background-image: url(${(props) => props.$backgroundImage});
  background-size: cover;
  background-position: center;

  @media (min-width: 640px) {
    padding: 8rem 0 10rem;
  }
`;

const GradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.9),
    rgba(255, 255, 255, 0.2)
  );
  z-index: 1;
`;

const HeroTextContainer = styled.div`
  position: relative;
  max-width: 42rem;
  margin: 0 auto;
  text-align: center;
  z-index: 2;
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  color: #000000;

  @media (min-width: 640px) {
    font-size: 3.75rem;
  }
`;

const HeroSubtitle = styled.p`
  margin-top: 1.5rem;
  font-size: 1.125rem;
  line-height: 1.75;
  color: #6b7280;
`;

const SearchContainer = styled.div`
  position: relative;
  margin-top: 2.5rem;
`;

const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: 28rem;
  margin: 0 auto;
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
