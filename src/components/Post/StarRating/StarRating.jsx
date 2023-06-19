import React, { useState } from "react";
import styled from "styled-components";
import { Rating } from "react-simple-star-rating";

const RatingWrapper = styled.div`
  margin-bottom: 30px;
`;
const RatingP = styled.p`
  margin-bottom: 10px;
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
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
          onPointerMove={onPointerMove}
          /* Available Props */
        />
      </RatingWrapper>
    </>
  );
}
