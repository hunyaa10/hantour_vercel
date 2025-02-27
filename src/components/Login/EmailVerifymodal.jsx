import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useColors } from "@context/ColorContext";
import CustomButton from "@components/custom/CustomButton";
import { verifyEmailApi, sendVerificationEmailApi } from "@api/axiosApi";

import XIcon from "@assets/icons/x-mark.svg";

const EmailVerifymodal = ({
  setShowEmailModal,
  onContinueClick,
  email,
  language = "en",
  verificationType = "SIGNUP",
}) => {
  const colors = useColors();
  const inputRefs = useRef([]);

  const [verifyNumber, setVerifyNumber] = useState(Array(6).fill(""));
  const [numberError, setNumberError] = useState("");

  const handleInputChange = (e, index) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) return;

    const updatedVerifyNumber = [...verifyNumber];
    updatedVerifyNumber[index] = value;

    setVerifyNumber(updatedVerifyNumber);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClickNumberBox = (index) => {
    const updatedVerifyNumber = [...verifyNumber];
    updatedVerifyNumber[index] = "";
    setVerifyNumber(updatedVerifyNumber);
  };

  const handleContinueClick = async () => {
    if (verifyNumber.includes("")) {
      setNumberError(
        language === "ko"
          ? "모든 인증 번호를 입력해주세요"
          : "Please enter all your authentication numbers"
      );
      return;
    }

    try {
      const code = verifyNumber.join("");
      await verifyEmailApi(email, code, verificationType);
      setNumberError("");
      onContinueClick(code);
    } catch (error) {
      setNumberError(
        language === "ko"
          ? "인증번호가 올바르지 않습니다"
          : "Invalid verification code"
      );
    }
  };

  const handleClickResendBtn = async () => {
    try {
      await sendVerificationEmailApi(email, verificationType);
      setNumberError("");
      setVerifyNumber(Array(6).fill(""));
      alert(
        language === "ko"
          ? "인증 번호가 재전송되었습니다."
          : "The authentication number has been retransmitted."
      );
    } catch (error) {
      alert(
        language === "ko"
          ? "인증번호 재전송에 실패했습니다."
          : "Failed to resend verification code"
      );
    }
  };

  return (
    <Wrapper onClick={() => setShowEmailModal(false)}>
      <EmailModal onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={() => setShowEmailModal(false)}>
          <img src={XIcon} alt="x-icon" />
        </CloseBtn>
        <Title>
          {language === "ko" ? "이메일 인증" : "Email Verification"}
        </Title>

        <Script>
          {language === "ko"
            ? "인증 번호를 확인해주세요."
            : "Please check the authentication number."}
        </Script>

        <NumberWrapper>
          <NumberContainer>
            {Array(6)
              .fill("")
              .map((_, index) => (
                <NumberBox
                  key={index}
                  type="text"
                  value={verifyNumber[index]}
                  onChange={(e) => handleInputChange(e, index)}
                  onClick={() => handleClickNumberBox(index)}
                  maxLength={1}
                  color={colors.sub}
                  ref={(el) => (inputRefs.current[index] = el)}
                />
              ))}
          </NumberContainer>
          {numberError && <ErrorMessage>{numberError}</ErrorMessage>}
        </NumberWrapper>

        <BtnContainer>
          <ContinueBtn onClick={handleContinueClick}>
            <CustomButton>
              {language === "ko" ? "인증" : "Continue"}
            </CustomButton>
          </ContinueBtn>
          <ResendBtn onClick={handleClickResendBtn}>
            <CustomButton bgColor={"#ececec"} textColor={"#333"}>
              {language === "ko"
                ? "인증 코드 재전송"
                : "Resend Verification Code"}
            </CustomButton>
          </ResendBtn>
        </BtnContainer>
      </EmailModal>
    </Wrapper>
  );
};

export default EmailVerifymodal;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
`;

const EmailModal = styled.div`
  width: 20%;
  height: 45%;
  background-color: #fff;
  border: 2px solid #ececec;
  border-radius: 0.5rem;
  padding: 2rem 1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 1440px) {
    width: 30%;
    height: 50%;
  }
`;
const CloseBtn = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  opacity: 0.7;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;
const Title = styled.h5``;

const Script = styled.div`
  font-size: 1rem;
`;

const NumberWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const NumberContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;
const NumberBox = styled.input`
  width: 3rem;
  height: 3rem;
  text-align: center;
  line-height: 2rem;
  border: 1px solid ${(props) => props.color};
  font-size: 1.2rem;
  color: ${(props) => props.color};
`;

const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
const ContinueBtn = styled.div`
  width: 100%;
`;
const ResendBtn = styled.div`
  width: 100%;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;
