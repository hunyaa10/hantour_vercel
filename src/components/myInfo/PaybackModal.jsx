import React from "react";
import styled from "styled-components";
import { useColors } from "@context/ColorContext";
import CustomButton from "@components/custom/CustomButton";

import XIcon from "@assets/icons/x-mark.svg";

const PaybackModal = ({
  setIsPaybackModalOpen,
  totalPoints,
  onPaybackComplete,
}) => {
  const colors = useColors();

  const [paybackAmount, setPaybackAmount] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [bankInfo, setBankInfo] = React.useState({
    bank: "",
    accountNumber: "",
    accountHolder: "",
  });

  const validatePaybackAmount = (amount) => {
    const numAmount = Number(amount);
    if (numAmount > totalPoints) {
      setErrorMessage("Payback amount cannot exceed your total points.");
      return false;
    }
    if (numAmount < 100000) {
      setErrorMessage("Minimum payback amount is 100,000 points.");
      return false;
    }
    if (numAmount % 1000 !== 0) {
      setErrorMessage("Payback amount must be in increments of 1,000 points.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setPaybackAmount(value);
    validatePaybackAmount(value);
  };

  const handlePayback = () => {
    if (validatePaybackAmount(paybackAmount)) {
      alert(
        `Your payback request for ${Number(
          paybackAmount
        ).toLocaleString()} points has been completed.`
      );

      onPaybackComplete(Number(paybackAmount));
      setIsPaybackModalOpen(false);
    }
  };

  const validateBankInfo = () => {
    if (!bankInfo.bank) {
      setErrorMessage("Please select a bank.");
      return false;
    }
    if (!bankInfo.accountNumber) {
      setErrorMessage("Please enter your account number.");
      return false;
    }
    if (!bankInfo.accountHolder) {
      setErrorMessage("Please enter the account holder name.");
      return false;
    }
    return true;
  };

  const handleBankInfoChange = (e) => {
    const { name, value } = e.target;
    
    // 계좌번호 입력 시 숫자만 허용
    if (name === 'accountNumber') {
      const numericValue = value.replace(/[^0-9]/g, '');
      setBankInfo(prev => ({
        ...prev,
        [name]: numericValue
      }));
    } else {
      setBankInfo(prev => ({
        ...prev,
        [name]: value
      }));
    }
    setErrorMessage("");
  };

  return (
    <Wrapper onClick={() => setIsPaybackModalOpen(false)}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <ModalClose onClick={() => setIsPaybackModalOpen(false)}>
          <img src={XIcon} alt="x-mark" />
        </ModalClose>

        <ModalHeader>
          <ModalTitle>Point Payback</ModalTitle>
        </ModalHeader>

        <ModalContent>
          <TotalPoints>
            Available Points: <span>{totalPoints} P</span>
          </TotalPoints>

          <ContentText color={colors.sub}>
            How much would you like to pay back?
            <span>
              (Payback is available from 100,000 points, in increments of 1,000
              points)
            </span>
          </ContentText>

          <InputWrapper>
            <Input
              type="number"
              min="100000"
              step="1000"
              value={paybackAmount}
              onChange={handleInputChange}
              placeholder="Enter amount"
            />
            <span>points</span>
          </InputWrapper>

          <BankInfoSection>
            <BankInfoTitle color={colors.sub}>
              Please enter your bank account information
            </BankInfoTitle>
            
            <AccountInfoRow>
              <Select
                name="bank"
                value={bankInfo.bank}
                onChange={handleBankInfoChange}
              >
                <option value="">Select Bank</option>
                <option value="HSBC">HSBC</option>
                <option value="Citibank">Citibank</option>
                <option value="JPMorgan">JPMorgan Chase</option>
                <option value="BankOfAmerica">Bank of America</option>
                <option value="WellsFargo">Wells Fargo</option>
                <option value="DeutscheBank">Deutsche Bank</option>
                <option value="BNPParibas">BNP Paribas</option>
                <option value="Barclays">Barclays</option>
                <option value="StandardChartered">Standard Chartered</option>
                <option value="Goldman">Goldman Sachs</option>
                <option value="UBS">UBS</option>
                <option value="CreditSuisse">Credit Suisse</option>
                <option value="RBS">Royal Bank of Scotland</option>
                <option value="Santander">Santander</option>
                <option value="Other">Other</option>
              </Select>
              <Input
                type="text"
                pattern="[0-9]*"
                inputMode="numeric"
                name="accountNumber"
                value={bankInfo.accountNumber}
                onChange={handleBankInfoChange}
                placeholder="Enter account number (without '-')"
              />
            </AccountInfoRow>
            <Input
              type="text"
              name="accountHolder"
              value={bankInfo.accountHolder}
              onChange={handleBankInfoChange}
              placeholder="Enter account holder name"
            />
          </BankInfoSection>
        </ModalContent>

        <BtnBox>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <CustomButton
            width="40%"
            // onClick={handlePayback}
            disabled={!!errorMessage || !paybackAmount}
          >
            Payback
          </CustomButton>
        </BtnBox>
      </Modal>
    </Wrapper>
  );
};

export default PaybackModal;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div`
  width: 40%;
  height: 70%;
  padding: 2rem;
  background-color: #fff;
  border-radius: 0.5rem;
  position: relative;

  @media screen and (max-width: 1440px) {
    width: 40%;
    padding: 1.5rem;
  }

  @media screen and (max-width: 1280px) {
    width: 50%;
  }

  @media screen and (max-width: 1024px) {
    width: 60%;
    height: 65%;
  }
`;

const ModalClose = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }

  @media screen and (max-width: 1440px) {
    top: 1rem;
    right: 1rem;
  }
`;

const ModalHeader = styled.div`
  height: 40px;
  text-align: center;
  border-bottom: 1px solid #ececec;

  @media screen and (max-width: 1024px) {
    height: 30px;
  }
`;

const ModalTitle = styled.h3`
  @media screen and (max-width: 1024px) {
    font-size: 1rem;
  }
`;

const TotalPoints = styled.div`
  font-weight: 500;

  span {
    font-weight: 700;
    font-size: 1.4rem;
    color: #dc3545;
  }

  @media screen and (max-width: 1024px) {
    span {
      font-size: 1.2rem;
    }
  }
`;

const ModalContent = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const ContentText = styled.p`
  text-align: center;

  span {
    margin-top: 0.5rem;
    display: block;
    font-size: 1rem;
    color: ${({ color }) => color};
  }

  @media screen and (max-width: 1440px) {
    span {
      font-size: 0.9rem;
    }
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0 1rem;
`;

const Input = styled.input`
  width: ${props => props.type === "number" ? "200px" : "100%"};
  height: 40px;
  padding: 0 1rem;
  border: 1px solid #dfdfdf;
  border-radius: 4px;
  font-size: 1.2rem;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    opacity: 1;
  }

  @media screen and (max-width: 1440px) {
    font-size: 1rem;
  }
`;

const BtnBox = styled.div`
  width: 100%;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);

  @media screen and (max-width: 1024px) {
    bottom: 1.5rem;
  }
`;

const ErrorMessage = styled.p`
  color: #dc3545;
  font-size: 1rem;
  text-align: center;

  @media screen and (max-width: 1440px) {
    font-size: 0.9rem;
  }
`;

const BankInfoSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const BankInfoTitle = styled.p`
  width: 100%;
  text-align: center;
  color: #333;
  margin-bottom: 0.5rem;
  border-top: 1px solid #ececec;
  padding-top: 1rem;
`;

const AccountInfoRow = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
`;

const Select = styled.select`
  width: 50%;
  height: 40px;
  padding: 0 1rem;
  border: 1px solid #dfdfdf;
  border-radius: 4px;
  font-size: 1.2rem;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    opacity: 1;
  }

  @media screen and (max-width: 1440px) {
    font-size: 1rem;
  }
`;
