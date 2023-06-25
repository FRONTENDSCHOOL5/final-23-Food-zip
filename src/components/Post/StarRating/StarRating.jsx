import React, { useState } from "react";
import styled from "styled-components";
import { Rating } from "react-simple-star-rating";
import { useEffect } from "react";

const RatingWrapper = styled.div`
  margin-bottom: 28px;
`;
const RatingP = styled.p`
  margin-bottom: 14px;
  font-size: 15px;
  font-weight: 900;
  color: #186738;
`;
export default function StarRating({ onRatingChange }) {
  const [rating, setRating] = useState(0);
  const handleRating = rate => {
    setRating(rate);
    onRatingChange(rate);
    // other logic
  };
  // Optinal callback functions
  const onPointerEnter = () => console.log("Enter");
  const onPointerLeave = () => console.log("Leave");
  const onPointerMove = (value, index) => console.log(value, index);
  return (
    <>
      <RatingWrapper>
        <RatingP>평점</RatingP>
        <Rating
          onClick={handleRating}
          ratingValue={rating}
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
          onPointerMove={onPointerMove}
          // size={30}
          /* Available Props */
        />
      </RatingWrapper>
    </>
  );
}
