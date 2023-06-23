import React from "react";
import styled, { keyframes } from "styled-components";

const Flexbox = styled.div`
  > div {
    height: calc(100vh - 50px);
    flex: 0 0 25%;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-sizing: border-box;
    margin: 0;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  @media only screen and (max-width: 968px) {
    > div {
      flex: 0 0 33.3333333%;
    }
  }

  @media only screen and (max-width: 768px) {
    > div {
      flex: 0 0 50%;
    }
  }

  @media only screen and (max-width: 568px) {
    > div {
      flex: 0 0 100%;
    }
  }
`;

const opaque = keyframes`
  0% {
    opacity: 0.1;
  }
  40% {
    opacity: 1;
  }
  80% {
    opacity: 0.1;
  }
  100% {
    opacity: 0.1;
  }
`;

const CircleLoader = styled.div`
  position: relative;
  width: auto;
  height: auto;

  div {
    height: 10px;
    width: 10px;
    background-color: #545454;
    border-radius: 50%;
    position: absolute;
    animation: ${opaque} 0.8s ease-in-out infinite both;

    &:nth-child(1) {
      top: -25px;
      left: 0;
    }
    &:nth-child(2) {
      top: -17px;
      left: 17px;
      animation-delay: 0.1s;
    }
    &:nth-child(3) {
      top: 0;
      left: 25px;
      animation-delay: 0.2s;
    }
    &:nth-child(4) {
      top: 17px;
      left: 17px;
      animation-delay: 0.3s;
    }
    &:nth-child(5) {
      top: 25px;
      left: 0;
      animation-delay: 0.4s;
    }
    &:nth-child(6) {
      top: 17px;
      left: -17px;
      animation-delay: 0.5s;
    }
    &:nth-child(7) {
      top: 0;
      left: -25px;
      animation-delay: 0.6s;
    }
    &:nth-child(8) {
      top: -17px;
      left: -17px;
      animation-delay: 0.7s;
    }
  }
`;

export default function Loading() {
  return (
    <Flexbox>
      <div>
        <CircleLoader>
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </CircleLoader>
      </div>
    </Flexbox>
  );
}
