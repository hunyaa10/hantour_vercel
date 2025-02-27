import CustomButton from "@components/custom/CustomButton";
import ReviewModal from "@components/ReviewModal";
import React, { useState } from "react";
import styled from "styled-components";

const reviews = [
  {
    id: 1,
    userId: "asd***",
    rating: 4,
    text: "좋은 호텔이에요! 만족스럽습니다.",
    createdAt: "2024-03-21",
  },
  {
    id: 2,
    userId: "qwe***",
    rating: 2,
    text: "청결상태는 나쁘지 않지만 아쉬워요.",
    createdAt: "2024-03-22",
  },
  {
    id: 3,
    userId: "zxc***",
    rating: 5,
    text: "정말 훌륭합니다! 나중에 가족이랑 재방문하고싶어요.",
    createdAt: "2024-03-23",
  },
];

const StarRating = ({ rating }) => {
  const maxStars = 5;

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= maxStars; i++) {
      stars.push(
        <span key={i} className={`star ${i <= rating ? "filled" : "empty"}`}>
          {i <= rating ? "★" : "☆"}
        </span>
      );
    }
    return stars;
  };

  return <div className="star-rating">{renderStars()}</div>;
};

const HotelReview = () => {
  const [showReviewModal, setShowReviewModal] = useState(false);

  const handleClickAddReview = () => {
    setShowReviewModal(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\. /g, ".")
      .replace(/\.$/, "");
  };

  return (
    <ReviewContainer>
      <TitleBox>
        <Title>Review</Title>
        <CustomButton
          width="15%"
          padding="0.5rem 1rem"
          onClick={handleClickAddReview}
        >
          Add rewiew
        </CustomButton>
      </TitleBox>

      {reviews.map((review) => (
        <ReviewBox key={review.id} className="review-box">
          <ReviewTitle>
            <UserID>{review.userId}</UserID>
            <GradeBox>
              <StarRating rating={review.rating} />
            </GradeBox>
            {/* <ReviewDate>{formatDate(review.createdAt)}</ReviewDate> */}
          </ReviewTitle>
          <Script>{review.text}</Script>
        </ReviewBox>
      ))}

      {showReviewModal && (
        <ReviewModal
          setShowReviewModal={setShowReviewModal}
          reviews={reviews}
        />
      )}
    </ReviewContainer>
  );
};

export default HotelReview;

const ReviewContainer = styled.div`
  padding: 4rem 0;
`;

const TitleBox = styled.div`
  width: 100%;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #ececec;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Title = styled.h3``;

const ReviewBox = styled.div`
  padding: 1rem 0;
  border-bottom: 1px solid #ececec;
`;
const ReviewTitle = styled.div`
  padding-bottom: 0.5rem;
  display: flex;
  align-items: flex-end;
  gap: 1rem;
`;
const UserID = styled.h5``;
const GradeBox = styled.div``;

const ReviewDate = styled.span`
  color: #666;
  font-size: 0.9rem;
  margin-left: auto;
`;

const GradeStar = styled.img``;
const Script = styled.div``;
