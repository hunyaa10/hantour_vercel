

import React from "react";
import styled from "styled-components";
import Image from "../assets/images/hero-image.png";
import HeroSectionComponent from "@components/home/HeroSection";
import MainHotel from "@components/home/MainHotel";

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #ffffff;
`;

export default function Home() {
  return (
    <PageWrapper>
      <HeroSectionComponent backgroundImage={Image} />
      <MainHotel />
    </PageWrapper>
  );
}
