import React, { useEffect, useState, useContext } from "react";
import styled, { keyframes } from "styled-components";
import { Context } from "./RandomRecommendContext";

const ModalTopDiv = styled.div`
  position: fixed;
  top: -2%;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  z-index: 1;
  width: 100%;
  max-width: 390px;
`;

const slideDown = keyframes`
    0% {
      transform: translateY(-2%);
      opacity: 1;
    }
    30% {
      transform: translateY(100%);
      opacity: 1;
    }
    50% {
      transform: translateY(100%);
      opacity: 1;
    }
    100% {
      transform: translateY(-2%);
      opacity: 1;
    }
  `;

const RandomDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  perspective: 1000px;
  background-color: #629678;
  border-radius: 0 0 20px 20px;
  animation: ${slideDown} 8s ease;
`;

const RandomP = styled.div`
  margin: 0 10px;
  padding: 5px 10px;
  height: 100px;
  line-height: 100px;
  border-radius: 5px;
  animation-duration: 0.1s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  transform-origin: center;
  transform-style: preserve-3d;
  font-size: 22px;
  font-weight: 900;
  color: #fff;
`;

export default function RandomRecommend({ randomClose }) {
  const [handleRecommendation, isAnimationActive, randomFood, foodName] =
    useContext(Context);
  return (
    <ModalTopDiv onClick={randomClose}>
      <RandomDiv isAnimationActive={isAnimationActive}>
        <RandomP>
          {isAnimationActive
            ? `${randomFood} 땡겨요`
            : foodName[randomFood] && `${foodName[randomFood]} 땡겨요`}
        </RandomP>
      </RandomDiv>
    </ModalTopDiv>
  );
}
