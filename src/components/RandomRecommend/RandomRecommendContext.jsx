import React, { createContext, useEffect, useState } from "react";

export const Context = createContext();

export default function RandomRecommendContext(props) {
  const [randomFood, setRandomFood] = useState("");
  const [isAnimationActive, setIsAnimationActive] = useState(false);

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

  const handleRecommendation = () => {
    setRandomFood("");
    setTimeout(() => {
      if (!isAnimationActive) {
        setRandomFood("");
        setIsAnimationActive(true);
      }
    }, 1200);
  };
  return (
    <Context.Provider
      value={[handleRecommendation, isAnimationActive, randomFood, foodName]}
    >
      {props.children}
    </Context.Provider>
  );
}
