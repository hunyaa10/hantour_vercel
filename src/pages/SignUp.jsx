import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import CustomInput from "@components/custom/CustomInput";
import CustomButton from "@components/custom/CustomButton";
import EmailVerifymodal from "@components/Login/EmailVerifymodal";
import { sendVerificationEmailApi, signupApi, verifyEmailApi } from "@api/axiosApi";

import Logo from "@assets/logo/logo-H.svg";
import LogoName from "@assets/logo/logo-Hantour.svg";
import EyeOffIcon from "@assets/icons/eye-off-outline.svg";
import XIcon from "@assets/icons/x-mark.svg";

const SignUp = () => {
  const navigate = useNavigate();

  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  // const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const [showEmailModal, setShowEmailModal] = useState(false);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const isPasswordMatch = passwordValue === confirmPasswordValue;

  const handleClickXIcon = () => {
    const isLeaving = window.confirm(
      "Your changes will not be saved. Do you really want to leave?"
    );

    if (isLeaving) {
      navigate("/login");
    }
  };

  const handleVerifyEmail = async () => {
    if (!emailValue || emailError) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      await sendVerificationEmailApi(emailValue, "SIGNUP");
      setShowEmailModal(true);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to send verification email";
      alert(errorMessage);
      console.error("이메일 인증 요청 실패:", error);
    }
  };

  const handleClickContinue = async (code) => {
    try {
      await verifyEmailApi(emailValue, code, "SIGNUP");
      setIsEmailVerified(true);
      setIsBtnDisabled(true);
      setShowEmailModal(false);
      alert("Email verification completed successfully!");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Email verification failed";
      alert(errorMessage);
      console.error("이메일 인증 실패:", error);
    }
  };

  const handleClickCreateBtn = async () => {
    if (!isEmailVerified) {
      alert("Please verify your email first");
      return;
    }
    if (!isPasswordMatch || passwordError) {
      alert("Please check your password");
      return;
    }
    if (!firstName || !lastName || !companyName) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await signupApi(
        emailValue,
        passwordValue,
        firstName,
        lastName,
        companyName
      );
      alert("Congratulations on your membership!");
      navigate("/login");
    } catch (error) {
      alert("Failed to create account. Please try again.");
    }
  };

  return (
    <Wrapper>
      <SignupWrapper>
        <NavTitle>
          Sign up
          <img src={XIcon} alt="x-icon" onClick={handleClickXIcon} />
        </NavTitle>

        <Container>
          <LogoContainer>
            <Link to="/">
              <LogoBox>
                {/* <img src={Logo} alt="logo" /> */}
                <img src={LogoName} alt="logo-name" />
              </LogoBox>
            </Link>
            {/* <Script>
              Find the perfect space for your cherished moments with Kong tour
            </Script> */}
          </LogoContainer>

          <SignupForm>
            <FormInner>
              <EmailBox>
                <CustomInput
                  width={"82%"}
                  labelText={"Email"}
                  placeholder={"Email"}
                  type={"email"}
                  value={emailValue}
                  onChange={setEmailValue}
                  validateType={"email"}
                  onError={setEmailError}
                  disabled={isEmailVerified}
                />
                <VerifyBtn onClick={handleVerifyEmail}>
                  <CustomButton
                    fontSize={"0.9rem"}
                    fontWeight={"500"}
                    disabled={isBtnDisabled}
                  >
                    {isEmailVerified ? "Verified" : "Verify"}
                  </CustomButton>
                </VerifyBtn>
              </EmailBox>
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
                  // validateType={"password"}
                  // onError={setPasswordError}
                  imageSrc={EyeOffIcon}
                  isVisible={isConfirmPasswordVisible}
                  onIconClick={() =>
                    setIsConfirmPasswordVisible((prev) => !prev)
                  }
                />
                {!isPasswordMatch && confirmPasswordValue && (
                  <ErrorMessage>Passwords do not match</ErrorMessage>
                )}
              </div>

              <NameBox>
                <CustomInput
                  labelText={"First Name"}
                  placeholder={"First Name"}
                  value={firstName}
                  onChange={setFirstName}
                />
                <CustomInput
                  labelText={"Last Name"}
                  placeholder={"Last Name"}
                  value={lastName}
                  onChange={setLastName}
                />
              </NameBox>
              <CustomInput
                labelText={"Company Name"}
                placeholder={"Company Name"}
                value={companyName}
                onChange={setCompanyName}
              />
            </FormInner>
            <BtnBox onClick={handleClickCreateBtn}>
              <CustomButton>Create Account</CustomButton>
            </BtnBox>
          </SignupForm>
        </Container>
      </SignupWrapper>

      {/* 이메일 인증모달창 */}
      {showEmailModal && (
        <EmailVerifymodal
          setShowEmailModal={setShowEmailModal}
          onContinueClick={handleClickContinue}
          email={emailValue}
        />
      )}
    </Wrapper>
  );
};

export default SignUp;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
const SignupWrapper = styled.div`
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
  padding: 2rem 1rem 1rem 1rem;
  width: 100%;
  height: 92%;
`;

const LogoContainer = styled.div`
  width: 60%;
  margin: auto;
  margin-bottom: 2rem;

  @media screen and (max-width: 1512px) {
    margin-bottom: 0.5rem;
  }
`;
const LogoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;
const Script = styled.p`
  font-size: 0.9rem;
  text-align: center;
  line-height: 1.8;
`;

const SignupForm = styled.form`
  height: 85%;
  position: relative;
`;

const FormInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media screen and (max-width: 1512px) {
    gap: 0.5rem;
  }
`;
const EmailBox = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  position: relative;
`;
const VerifyBtn = styled.div`
  width: 15%;
  position: absolute;
  right: 0;
  top: 24px;

  @media screen and (max-width: 1512px) {
    top: 20px;
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
  padding-top: 0.5rem;
  color: red;
  font-size: 0.9rem;

  @media screen and (max-width: 1512px) {
    font-size: 0.8rem;
    padding-top: 0;
  }
`;

const NameBox = styled.div`
  display: flex;
  gap: 1rem;
`;

const BtnBox = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;

  @media screen and (max-width: 1512px) {
    bottom: -2rem;
  }
`;
