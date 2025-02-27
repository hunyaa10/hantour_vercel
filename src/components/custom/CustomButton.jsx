import React from "react";
import styled from "styled-components";
import { useColors } from "@context/ColorContext";

const CustomButton = ({
  children,
  width,
  bgColor,
  textColor,
  borderColor,
  padding,
  shadow,
  fontSize,
  fontWeight,
  imageSrc,
  onClick,
  type = "button",
  disabled = false,
}) => {
  const colors = useColors();

  return (
    <Button
      color={colors.main}
      width={width}
      $bgColor={bgColor}
      $textColor={textColor}
      $borderColor={borderColor}
      $padding={padding}
      $shadow={shadow}
      $fontSize={fontSize}
      $fontWeight={fontWeight}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {imageSrc && <Icon src={imageSrc} alt="button-icon" />}
      {children}
    </Button>
  );
};

export default CustomButton;

const Button = styled.button`
  width: ${(props) => (props.width ? props.width : "100%")};
  padding: ${(props) => (props.$padding ? props.$padding : "1rem")};
  background-color: ${(props) =>
    props.disabled ? "#ccc" : props.$bgColor || props.color};
  color: ${(props) => (props.disabled ? "#666" : props.$textColor || "#fff")};
  border: 1px solid transparent;
  border-radius: 0.5rem;
  border-color: ${(props) =>
    props.$borderColor ? props.$borderColor : "transparent"};
  font-size: ${(props) => (props.$fontSize ? props.$fontSize : "1rem")};
  font-weight: ${(props) => (props.$fontWeight ? props.$fontWeight : "500")};
  box-shadow: ${(props) => (props.$shadow ? props.$shadow : "none")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  /* &:hover {
    background-color: ${(props) => props.color};
  } */

  @media screen and (max-width: 1440px) {
    font-size: 0.9rem;
  }
`;
const Icon = styled.img`
  width: 24px;
  height: 24px;
`;
