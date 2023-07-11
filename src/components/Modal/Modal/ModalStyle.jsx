import styled, { keyframes } from "styled-components";

const ModalDiv = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 390px;
`;

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const ModalWrapArticle = styled.article`
  border-radius: 10px 10px 0 0;
  padding: 16px 26px 10px;
  background-color: white;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  width: 100%;
  animation: ${slideUp} 0.5s ease;
`;

const ModalLineSpan = styled.span`
  display: block;
  width: 50px;
  height: 4px;
  border-radius: 5px;
  background-color: #dbdbdb;
  margin: 0 auto 16px;
`;

const ModalTextBtn = styled.button`
  display: block;
  padding: 14px 0;
  box-sizing: border-box;
  font-size: 14px;
  background-color: transparent;
  border: 0;
  width: 100%;
  text-align: left;
`;

export { ModalDiv, ModalWrapArticle, ModalLineSpan, ModalTextBtn };
