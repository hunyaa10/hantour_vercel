import CustomButton from "../custom/CustomButton";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import XIcon from "@assets/icons/x-mark.svg";

const ReservationCancelModal = ({ setIsShowCancelModal }) => {
  const navigate = useNavigate();

  const handleCancelReservation = () => {
    alert("Your reservation cancellation application has been completed.");
    navigate("/my-info/booking-history");
    window.location.reload();
  };

  return (
    <Wrapper onClick={() => setIsShowCancelModal(false)}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={() => setIsShowCancelModal(false)}>
          <img src={XIcon} alt="x-icon" />
        </CloseBtn>
        <Text>Are you sure you want to cancel your reservation?</Text>
        <BtnBox>
          <CustomButton onClick={handleCancelReservation}>
            Cancel reservation
          </CustomButton>
        </BtnBox>
      </Modal>
    </Wrapper>
  );
};

export default ReservationCancelModal;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div`
  width: 30%;
  height: 30%;
  background-color: #fff;
  border-radius: 0.5rem;
  position: relative;

  @media screen and (max-width: 1440px) {
    width: 40%;
  }
`;
const CloseBtn = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`;

const Text = styled.div`
  text-align: center;
  margin-top: 5rem;

  @media screen and (max-width: 1440px) {
    margin-top: 4rem;
  }
`;

const BtnBox = styled.div`
  width: 40%;
  position: absolute;
  left: 50%;
  bottom: 2rem;
  transform: translateX(-50%);
`;
