import React from "react";
import styled from "styled-components";

const ModalWrapDiv = styled.div`
  width: 390px;
  border-radius: 10px 10px 0 0;
  padding: 16px 26px 10px;
  background-color: white;
  box-sizing: border-box;
`;

const ModalLineSpan = styled.span`
  display: block;
  width: 50px;
  height: 4px;
  border-radius: 5px;
  background-color: #dbdbdb;
  margin: 0 auto 16px;
`;

const ModalTextP = styled.p`
  padding: 14px 0;
`;

export default function Modal({ type }) {
  const UI = {
    setting: (
      <ModalWrapDiv>
        <ModalLineSpan></ModalLineSpan>
        <ModalTextP>설정 및 개인정보</ModalTextP>
        <ModalTextP>로그아웃</ModalTextP>
      </ModalWrapDiv>
    ),
    modification: (
      <ModalWrapDiv>
        <ModalLineSpan></ModalLineSpan>
        <ModalTextP>삭제</ModalTextP>
        <ModalTextP>수정</ModalTextP>
      </ModalWrapDiv>
    ),
    product: (
      <ModalWrapDiv>
        <ModalLineSpan></ModalLineSpan>
        <ModalTextP>삭제</ModalTextP>
        <ModalTextP>수정</ModalTextP>
        <ModalTextP>웹사이트에서 상품 보기</ModalTextP>
      </ModalWrapDiv>
    ),
    report: (
      <ModalWrapDiv>
        <ModalLineSpan></ModalLineSpan>
        <ModalTextP>신고하기</ModalTextP>
      </ModalWrapDiv>
    ),
    delete: (
      <ModalWrapDiv>
        <ModalLineSpan></ModalLineSpan>
        <ModalTextP>삭제</ModalTextP>
      </ModalWrapDiv>
    ),
    chat: (
      <ModalWrapDiv>
        <ModalLineSpan></ModalLineSpan>
        <ModalTextP>채팅방 나가기</ModalTextP>
      </ModalWrapDiv>
    ),
  };

  return UI[type];
}
