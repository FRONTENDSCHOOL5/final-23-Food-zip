import React, { createContext, useEffect, useState } from "react";

export const Context = createContext();

export default function RandomRecommendContext(props) {
  const [randomFood, setRandomFood] = useState("");
  const [isAnimationActive, setIsAnimationActive] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

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
      setIsButtonDisabled(true); // Disable the button during the animation

      intervalId = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * foodList.length);
        setRandomFood(foodList[randomIndex]);
      }, 80); // 0.08초마다 음식을 랜덤으로 선택하여 업데이트

      setTimeout(() => {
        clearInterval(intervalId);
        setIsAnimationActive(false);
        setTimeout(() => {
          setIsButtonDisabled(false); // Enable the button after 1 second
        }, 1800);
      }, 2000); // 2초 후에 애니메이션 완료
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isAnimationActive, foodList]);

  const handleRecommendation = () => {
    if (!isAnimationActive) {
      setRandomFood(""); // Reset the random food
      setIsAnimationActive(true);
    }
  };
  return (
    <Context.Provider
      value={[handleRecommendation, isAnimationActive, randomFood, foodName]}
    >
      {props.children}
    </Context.Provider>
  );
}
