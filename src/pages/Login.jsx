import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "@components/custom/CustomInput";
import CustomButton from "@components/custom/CustomButton";
import { useColors } from "@context/ColorContext";
import { loginApi, googleLoginApi } from "@api/axiosApi";

import XIcon from "@assets/icons/x-mark.svg";
import Logo from "@assets/logo/logo-H.svg";
import LogoName from "@assets/logo/logo-Hantour.svg";
import AppleLogo from "@assets/logo/logo-Apple.svg";
import GoogleLogo from "@assets/logo/logo-Google.svg";
import EyeOffIcon from "@assets/icons/eye-off-outline.svg";

const Login = () => {
  const colors = useColors();
  const navigate = useNavigate();

  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [autoLogin, setAutoLogin] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (emailError || passwordError) {
      alert("Please check your email and password");
      return;
    }

    try {
      const response = await loginApi(emailValue, passwordValue, autoLogin);
      console.log("로그인 성공:", response.message);
      navigate("/", { replace: true });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to login. Please check your credentials.";
      alert(errorMessage);
      console.error("로그인 실패:", error);
    }
  };

  const handleGoogleLogin = () => {
    googleLoginApi();
  };

  return (
    <Wrapper>
      <LoginWrapper>
        <NavTitle>
          Login
          <Link to="/">
            <img src={XIcon} alt="x-icon" />
          </Link>
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
          <LoginForm onSubmit={handleLogin}>
            <CustomInput
              labelText={"Email"}
              placeholder={"Email"}
              type={"email"}
              onChange={setEmailValue}
              validateType={"email"}
              onError={setEmailError}
            />
            <CustomInput
              labelText={"Password"}
              placeholder={"Password"}
              type={isPasswordVisible ? "text" : "password"}
              onChange={setPasswordValue}
              validateType={"password"}
              onError={setPasswordError}
              imageSrc={EyeOffIcon}
              isVisible={isPasswordVisible}
              onIconClick={() => setIsPasswordVisible((prev) => !prev)}
            />

            <CheckboxContainer>
              <CheckboxLabel>
                <Checkbox
                  type="checkbox"
                  checked={autoLogin}
                  onChange={() => setAutoLogin(!autoLogin)}
                />
                Auto Login
              </CheckboxLabel>
              <Link to="/find-password">
                <PasswordLink>Forgot Password?</PasswordLink>
              </Link>
            </CheckboxContainer>

            <CustomButton
              type="submit"
              bgColor={colors.main}
              textColor="white"
              fontWeight="500"
              disabled={emailError || passwordError}
            >
              Login
            </CustomButton>
            <Link to="/sign-up">
              <CustomButton
                bgColor={"#fff"}
                textColor={colors.main}
                borderColor={colors.main}
                fontWeight={"500"}
              >
                Sign up
              </CustomButton>
            </Link>
          </LoginForm>

          <OauthContainer>
            {/* <OauthText>Other ways to sign in</OauthText> */}
            <CustomButton
              bgColor={"#fff"}
              textColor={"#666"}
              padding={"0.5rem"}
              fontSize={"0.9rem"}
              imageSrc={GoogleLogo}
              onClick={handleGoogleLogin}
              shadow={"0px 2px 5px rgba(0, 0, 0, 0.2)"}
              borderColor={"#e5e7eb"}
            >
              Sign in with Google
            </CustomButton>
            <CustomButton
              bgColor={"#000"}
              textColor={"#fff"}
              padding={"0.5rem"}
              fontSize={"0.9rem"}
              imageSrc={AppleLogo}
              borderColor={"#000"}
            >
              Sign in with Apple
            </CustomButton>
            <PolicyText color={colors.sub}>
              Continuing means you agree to HanTour's Terms of Use and Privacy
              Policy.
            </PolicyText>
          </OauthContainer>
        </Container>
      </LoginWrapper>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LoginWrapper = styled.div`
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
  display: flex;
  flex-direction: column;
`;

const LogoContainer = styled.div`
  width: 60%;
  margin: auto;
  margin-bottom: 4rem;

  @media screen and (max-width: 1440px) {
    margin-bottom: 2rem;
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

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media screen and (max-width: 1440px) {
    gap: 0.5rem;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Checkbox = styled.input``;
const CheckboxLabel = styled.label`
  font-size: 0.8rem;
  color: #666;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  cursor: pointer;
`;
const PasswordLink = styled.span`
  font-size: 0.8rem;
  color: #666;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const OauthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 5rem;

  @media screen and (max-width: 1440px) {
    margin-top: 2rem;
  }
`;
const OauthText = styled.p`
  font-size: 0.8rem;
`;
const PolicyText = styled.p`
  width: 80%;
  text-align: center;
  font-size: 0.9rem;
  line-height: 1.8;
  color: ${(props) => props.color};

  @media screen and (max-width: 1440px) {
    font-size: 0.8rem;
    line-height: 1.5;
  }
`;
