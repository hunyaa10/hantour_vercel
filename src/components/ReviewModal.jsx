import React, { useState } from "react";
import styled from "styled-components";
import { useColors } from "@context/ColorContext";
import CustomInput from "@components/custom/CustomInput";
import CustomButton from "@components/custom/CustomButton";

import XIcon from "@assets/icons/x-mark.svg";
import StarIcon from "@assets/icons/star.svg";
import StarFillIcon from "@assets/icons/star-fill.svg";

const ReviewModal = ({ setShowReviewModal, reviews }) => {
  const colors = useColors();

  const [rating, setRating] = useState(0);
  const [hotelNameValue, setHotelNameValue] = useState("");
  const [idValue, setIdValue] = useState("");
  const [contentValue, setContentValue] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (rating === 0) newErrors.rating = "Please select a rating";
    if (!hotelNameValue.trim()) newErrors.hotelName = "Please enter hotel name";
    if (!idValue.trim()) newErrors.id = "Please enter ID";
    if (!contentValue.trim()) newErrors.content = "Please enter review content";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  const handleClickCreate = () => {
    if (!validateForm()) return;
    const maskedId = idValue.slice(0, 3) + "***";
    const reviewData = {
      id: reviews.length + 1,
      userId: maskedId,
      rating,
      text: contentValue,
      createdAt: new Date().toISOString().split("T")[0],
    };
    console.log("New Review Data:", reviewData);
    alert("Your review has been registered.");
    setShowReviewModal(false);
  };

  return (
    <Wrapper onClick={() => setShowReviewModal(false)}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={() => setShowReviewModal(false)}>
          <img src={XIcon} alt="x-icon" />
        </CloseBtn>

        <Title>Create review</Title>

        <InputContainer>
          <StarBox>
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                src={rating > index ? StarFillIcon : StarIcon}
                alt="star"
                onClick={() => handleStarClick(index)}
              />
            ))}
            {errors.rating && <ErrorMessage>{errors.rating}</ErrorMessage>}
          </StarBox>
          <InputBox>
            <Label>Hotel Name</Label>
            <CustomInput
              placeholder={"Hotel Name"}
              value={hotelNameValue}
              onChange={(value) => setHotelNameValue(value)}
            />
            {errors.hotelName && (
              <ErrorMessage>{errors.hotelName}</ErrorMessage>
            )}
          </InputBox>
          <InputBox>
            <Label>ID</Label>
            <CustomInput
              placeholder={"ID"}
              value={idValue}
              onChange={(value) => setIdValue(value)}
            />
            {errors.id && <ErrorMessage>{errors.id}</ErrorMessage>}
          </InputBox>
          <InputBox>
            <Label>Content</Label>
            <TextInput
              typeof="text"
              placeholder="Please write a review."
              color={colors.sub}
              value={contentValue}
              onChange={(e) => setContentValue(e.target.value)}
            />
            {errors.content && <ErrorMessage>{errors.content}</ErrorMessage>}
          </InputBox>
        </InputContainer>

        <CreateBtn>
          <CustomButton onClick={handleClickCreate}>Create</CustomButton>
        </CreateBtn>
      </Modal>
    </Wrapper>
  );
};

export default ReviewModal;

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
  width: 40%;
  padding: 2rem;
  background-color: #fff;
  border-radius: 0.5rem;
  position: relative;

  @media screen and (max-width: 1280px) {
    width: 50%;
    padding: 1.5rem;
  }
`;
const CloseBtn = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  opacity: 0.7;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }

  @media screen and (max-width: 1280px) {
    top: 1.5rem;
    right: 1.5rem;
  }
`;

const Title = styled.h3`
  margin-bottom: 2rem;

  @media screen and (max-width: 1280px) {
    margin-bottom: 1rem;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StarBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const Star = styled.img`
  width: 48px;

  @media screen and (max-width: 1280px) {
    width: 40px;
  }
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;
const Label = styled.label`
  font-size: 1rem;
`;
const TextInput = styled.textarea`
  height: 200px;
  padding: 0.75rem;
  border: 1px solid ${(props) => props.color};
  border-radius: 0.5rem;
  font-size: 1rem;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${(props) => props.color};
  }
`;

const CreateBtn = styled.div`
  width: 100%;
  margin-top: 2rem;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 0.8rem;
  margin-top: 4px;
`;
