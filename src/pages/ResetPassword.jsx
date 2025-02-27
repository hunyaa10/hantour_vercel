import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import CustomInput from "@components/custom/CustomInput";
import CustomButton from "@components/custom/CustomButton";
import { resetPasswordApi } from "@api/axiosApi";

import EyeOffIcon from "@assets/icons/eye-off-outline.svg";
import XIcon from "@assets/icons/x-mark.svg";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [error, setError] = useState("");

  if (!location.state) {
    navigate("/find-password");
    return null;
  }

  const { email, code } = location.state;

  if (!email || !code) {
    navigate("/find-password");
    return null;
  }

  const isPasswordMatch = passwordValue === confirmPasswordValue;

  const handleClickContinue = async () => {
    if (!passwordValue || !confirmPasswordValue) {
      setError("Please fill out both password fields.");
      return;
    }

    if (passwordError) {
      setError("Please enter a valid password.");
      return;
    }

    if (!isPasswordMatch) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await resetPasswordApi(email, code, passwordValue);
      alert("Password has been reset successfully!");
      navigate("/login");
    } catch (error) {
      console.error("비밀번호 재설정 에러:", error);
      setError("Failed to reset password. Please try again.");
    }
  };

  return (
    <Wrapper>
      <FindWrapper>
        <NavTitle>
          Reset Password
          <Link to="/find-password">
            <img src={XIcon} alt="x-icon" />
          </Link>
        </NavTitle>

        <Container>
          <ResetForm>
            <PasswordBox>
              <CustomInput
                labelText={"Password"}
                placeholder={"Password"}
                type={isPasswordVisible ? "text" : "password"}
                value={passwordValue}
                onChange={setPasswordValue}
                validateType={"password"}
                onError={setPasswordError}
                imageSrc={EyeOffIcon}
                isVisible={isPasswordVisible}
                onIconClick={() => setIsPasswordVisible((prev) => !prev)}
              />
              <p>
                Please use 8 to 16 characters, including letters, numbers, and
                special characters.
              </p>
            </PasswordBox>

            <div>
              <CustomInput
                labelText={"Verify Password"}
                placeholder={"Verify Password"}
                type={isConfirmPasswordVisible ? "text" : "password"}
                value={confirmPasswordValue}
                onChange={setConfirmPasswordValue}
                validateType={"password"}
                onError={setConfirmPasswordError}
                imageSrc={EyeOffIcon}
                isVisible={isConfirmPasswordVisible}
                onIconClick={() => setIsConfirmPasswordVisible((prev) => !prev)}
              />
            </div>

            <BtnBox>
              {!isPasswordMatch && confirmPasswordValue && (
                <ErrorMessage>Passwords do not match</ErrorMessage>
              )}
              <CustomButton
                onClick={handleClickContinue}
                disabled={
                  passwordError ||
                  !isPasswordMatch ||
                  !passwordValue ||
                  !confirmPasswordValue
                }
              >
                Continue
              </CustomButton>
              {error && <ErrorMessage>{error}</ErrorMessage>}
            </BtnBox>
          </ResetForm>
        </Container>
      </FindWrapper>
    </Wrapper>
  );
};

export default ResetPassword;

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

const ResetForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
const EmailBox = styled.div`
  p {
    font-size: 0.8rem;
    padding-top: 0.5rem;
  }
`;

const PasswordBox = styled.div`
  p {
    padding-top: 0.5rem;
    font-size: 0.8rem;
    color: #666;
  }
`;
const ErrorMessage = styled.div`
  padding-bottom: 0.5rem;
  color: red;
  font-size: 0.9rem;
  text-align: center;
`;

const BtnBox = styled.div`
  width: 100%;
  margin-top: 2rem;
`;
