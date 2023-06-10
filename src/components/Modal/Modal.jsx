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

const ModalTextBtn = styled.button`
  display: block;
  padding: 14px 0;
  box-sizing: border-box;
  font-size: 14px;
  background-color: transparent;
  border: 0;
`;

export default function Modal({ type }) {
  const UI = {
    setting: (
      <ModalWrapDiv>
        <ModalLineSpan />
        <ModalTextBtn>설정 및 개인정보</ModalTextBtn>
        <ModalTextBtn>로그아웃</ModalTextBtn>
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
        <ModalTextBtn>웹사이트에서 상품 보기</ModalTextBtn>
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
        <ModalTextBtn>채팅방 나가기</ModalTextBtn>
      </ModalWrapDiv>
    ),
  };

  return UI[type];
}
