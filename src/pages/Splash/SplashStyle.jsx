import styled, { keyframes } from "styled-components";

const bounceAnimation = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(0, -1em, 0);
  }
`;

const BounceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 15%;
  color: #286140;
  white-space: nowrap;
`;

const BounceLetter = styled.span`
  animation: ${bounceAnimation} 0.75s cubic-bezier(0.05, 0, 0.2, 1) infinite
    alternate;
  display: inline-block;
  transform: translate3d(0, 0, 0);
  margin-top: 0.5em;
  font-size: 1.5em;
  font-weight: 600;
  margin-left: 3px;
  &:nth-of-type(1) {
    animation-delay: -0.083333333s;
  }
  &:nth-of-type(3) {
    animation-delay: 0.0833333333s;
  }
  &:nth-of-type(4) {
    animation-delay: 0.1666666667s;
  }
  &:nth-of-type(5) {
    animation-delay: 0.25s;
  }
  &:nth-of-type(6) {
    animation-delay: 0.3333333333s;
  }
  &:nth-of-type(7) {
    animation-delay: 0.4166666667s;
  }
`;

const SplashWrapDiv = styled.div`
  width: 390px;
  height: 100vh;
  background-color: white;
  padding-top: ${props => props.paddingTop};
  box-sizing: border-box;
`;

const SplashImg = styled.img`
  display: block;
  margin: 0 auto;
  width: 140px;
`;

export {
  bounceAnimation,
  BounceContainer,
  BounceLetter,
  SplashWrapDiv,
  SplashImg,
};
