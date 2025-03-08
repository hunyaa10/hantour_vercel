import React, { useState } from "react";
import styled from "styled-components";
import ForwardArrow from "@assets/icons/arrow-forward.svg";
import BackArrow from "@assets/icons/arrow-back.svg";

const ImageSlideModal = ({ images, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        
        <SlideContainer>
          <SlideImage src={images[currentIndex].src} alt={images[currentIndex].label} />
          <ImageLabel>{images[currentIndex].label}</ImageLabel>
          
          <ArrowButton left onClick={goToPrevious}>
            <img src={BackArrow} alt="back" />
          </ArrowButton>
          <ArrowButton right onClick={goToNext}>
            <img src={ForwardArrow} alt="forward" />
          </ArrowButton>
        </SlideContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  width: 80%;
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 2.5rem;
  cursor: pointer;
  z-index: 1;
  padding: 1rem;
`;

const SlideContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const SlideImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  margin: auto;
`;

const ImageLabel = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 1rem;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  ${props => props.left ? 'left: 20px;' : 'right: 20px;'}
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  img {
    width: 24px;
    height: 24px;
    filter: invert(1);
  }
`;

export default ImageSlideModal; 