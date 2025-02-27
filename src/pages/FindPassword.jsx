import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "@components/custom/CustomInput";
import CustomButton from "@components/custom/CustomButton";
import EmailVerifymodal from "@components/Login/EmailVerifymodal";
import { sendVerificationEmailApi } from "@api/axiosApi";

import XIcon from "@assets/icons/x-mark.svg";

const FindPassword = () => {
  const navigate = useNavigate();

  const [emailValue, setEmailValue] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const handleVerifyEmail = async () => {
    if (!emailValue || emailError) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      await sendVerificationEmailApi(emailValue, "PASSWORD_RESET");
      setShowEmailModal(true);
    } catch (error) {
      alert("Failed to send verification email");
      console.error("이메일 인증 요청 에러:", error);
    }
  };

  const handleClickContinue = (verificationCode) => {
    alert("Email authentication has been completed.");
    navigate("/reset-password", {
      state: {
        email: emailValue,
        code: verificationCode,
      },
    });
  };

  return (
    <Wrapper>
      <FindWrapper>
        <NavTitle>
          Find Password
          <Link to="/login">
            <img src={XIcon} alt="x-icon" />
          </Link>
        </NavTitle>

        <Container>
          <FindForm onSubmit={(e) => e.preventDefault()}>
            <EmailBox>
              <CustomInput
                labelText={"Email"}
                placeholder={"Email"}
                type={"email"}
                value={emailValue}
                onChange={(value) => setEmailValue(value)}
                validateType={"email"}
                onError={setEmailError}
              />
              <p>Please enter the email you registered with during sign-up</p>
            </EmailBox>
            <CustomButton
              onClick={handleVerifyEmail}
              disabled={emailError || !emailValue}
            >
              Continue
            </CustomButton>
          </FindForm>
        </Container>
      </FindWrapper>

      {/* 이메일 인증모달창 */}
      {showEmailModal && (
        <EmailVerifymodal
          setShowEmailModal={setShowEmailModal}
          onContinueClick={handleClickContinue}
          email={emailValue}
          verificationType="PASSWORD_RESET"
        />
      )}
    </Wrapper>
  );
};

export default FindPassword;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const FindWrapper = styled.div`
  width: 30%;
  height: 95%;
  border: 2px solid #ececec;
  border-radius: 1rem;
  margin: auto;
  overflow: hidden;
`;
const NavTitle = styled.div`
  height: 8%;
  padding: 0 1rem;
  background-color: #ececec;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  img {
    cursor: pointer;
    opacity: 0.7;

    &:hover {
      opacity: 1;
    }
  }
`;

const Container = styled.div`
  padding: 2rem 1rem;
`;

const FindForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;
const EmailBox = styled.div`
  p {
    font-size: 0.8rem;
    padding-top: 0.5rem;
  }
`;
