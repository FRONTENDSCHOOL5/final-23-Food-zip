import React, { useEffect } from "react";
import { ModalTopDiv, RandomSection, RandomText } from "./RandomRecommendStyle";
import { useRecoilState } from "recoil";
import {
  randomFoodState,
  isAnimationActiveState,
} from "../../atoms/randomFoodAtom";

export default function RandomRecommend({ randomClose }) {
  const [randomFood, setRandomFood] = useRecoilState(randomFoodState);
  const [isAnimationActive, setIsAnimationActive] = useRecoilState(
    isAnimationActiveState,
  );
  const foodList = [
    "🍕",
    "🌭",
    "🍔",
    "🍟",
    "🌮",
    "🥪",
    "🥗",
    "🍣",
    "🥘",
    "🍛",
    "🍰",
    "🍗",
    "🍞",
    "🍜",
    "🧇",
    "🍝",
    "🌯",
  ];
  const foodName = {
    "🍕": "피자",
    "🌭": "핫도그",
    "🍔": "햄버거",
    "🍟": "감자튀김",
    "🌮": "타코",
    "🥪": "샌드위치",
    "🥗": "샐러드",
    "🍣": "초밥",
    "🥘": "된장찌개",
    "🍛": "카레",
    "🍰": "케이크",
    "🍗": "치킨",
    "🍞": "빵",
    "🍜": "라면",
    "🧇": "와플",
    "🍝": "파스타",
    "🌯": "부리토",
  };

  useEffect(() => {
    let intervalId;

    if (isAnimationActive) {
      intervalId = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * foodList.length);
        setRandomFood(foodList[randomIndex]);
      }, 80);

      setTimeout(() => {
        clearInterval(intervalId);
        setIsAnimationActive(false);
      }, 1900);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isAnimationActive, foodList]);

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
