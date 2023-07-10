import styled, { keyframes } from "styled-components";

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

const RandomSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  perspective: 1000px;
  background-color: #629678;
  border-radius: 0 0 20px 20px;
  animation: ${slideDown} 8s ease;
`;

const RandomText = styled.p`
  animation-duration: 0.1s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  transform-origin: center;
  transform-style: preserve-3d;
  font-size: 22px;
  font-weight: 900;
  color: #fff;
`;

export { ModalTopDiv, slideDown, RandomSection, RandomText };
