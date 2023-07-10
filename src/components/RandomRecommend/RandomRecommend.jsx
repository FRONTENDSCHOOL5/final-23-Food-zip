import React, { useContext } from "react";
import { ModalTopDiv, RandomSection, RandomText } from "./RandomRecommendStyle";
import { Context } from "./RandomRecommendContext";

export default function RandomRecommend({ randomClose }) {
  const [handleRecommendation, isAnimationActive, randomFood, foodName] =
    useContext(Context);
  return (
    <ModalTopDiv onClick={randomClose}>
      <RandomSection isAnimationActive={isAnimationActive}>
        <RandomText>
          {isAnimationActive
            ? `${randomFood} 땡겨요`
            : foodName[randomFood] && `${foodName[randomFood]} 땡겨요`}
        </RandomText>
      </RandomSection>
    </ModalTopDiv>
  );
}
