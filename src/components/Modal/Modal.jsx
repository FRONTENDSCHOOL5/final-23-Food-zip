import React from "react";
import { useNavigate } from "react-router-dom";
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

const ModalWrapDiv = styled.div`
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
`;

export default function Modal({ type, modalClose, alertOpen }) {
  const navigate = useNavigate();
  const UI = {
    setting: (
      <ModalWrapDiv>
        <ModalLineSpan />
        <ModalTextBtn>설정 및 개인정보</ModalTextBtn>
        <ModalTextBtn onClick={alertOpen}>로그아웃</ModalTextBtn>
      </ModalWrapDiv>
    ),
    modification: (
      <ModalWrapDiv>
        <ModalLineSpan />
        <ModalTextBtn>삭제</ModalTextBtn>
        <ModalTextBtn>수정</ModalTextBtn>
      </ModalWrapDiv>
    ),
    product: (
      <ModalWrapDiv>
        <ModalLineSpan />
        <ModalTextBtn>삭제</ModalTextBtn>
        <ModalTextBtn>수정</ModalTextBtn>
        <ModalTextBtn>카카오맵으로 이동하기</ModalTextBtn>
        <ModalTextBtn>SNS 공유하기</ModalTextBtn>
      </ModalWrapDiv>
    ),
    report: (
      <ModalWrapDiv>
        <ModalLineSpan />
        <ModalTextBtn>신고하기</ModalTextBtn>
      </ModalWrapDiv>
    ),
    delete: (
      <ModalWrapDiv>
        <ModalLineSpan />
        <ModalTextBtn>삭제</ModalTextBtn>
      </ModalWrapDiv>
    ),
    chat: (
      <ModalWrapDiv>
        <ModalLineSpan />
        <ModalTextBtn onClick={() => navigate(-1)}>채팅방 나가기</ModalTextBtn>
      </ModalWrapDiv>
    ),
  };

  return (
    <>
      <ModalDiv onClick={modalClose}>{UI[type]}</ModalDiv>;
    </>
  );
}
