import React from "react";
import styled, { css } from "styled-components";

const AlertWrapDiv = styled.div`
  width: 252px;
  background-color: white;
  border-radius: 10px;
  box-sizing: border-box;
`;

const AlertTextP = styled.p`
  padding: 22px 58px;
  text-align: center;
  font-size: 16px;
  border-bottom: 1px solid #dbdbdb;
`;

const AlertBottomDiv = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AlertCommonBtn = css`
  flex-grow: 1;
  font-size: 14px;
  height: 46px;
  background-color: white;
  border: 0;
  border-radius: 0 0 10px 10px;
`;

const AlertDeleteBtn = styled.button`
  ${AlertCommonBtn}
`;

const AlertMainBtn = styled.button`
  ${AlertCommonBtn}
  color: #286140;
`;

const AlertLineSpan = styled.span`
  display: inline-block;
  width: 1px;
  height: 46px;
  background-color: #dbdbdb;
`;

export default function Alert({ type }) {
  const UI = {
    logout: (
      <AlertWrapDiv>
        <AlertTextP>로그아웃하시겠어요?</AlertTextP>
        <AlertBottomDiv>
          <AlertDeleteBtn>취소</AlertDeleteBtn>
          <AlertLineSpan></AlertLineSpan>
          <AlertMainBtn>로그아웃</AlertMainBtn>
        </AlertBottomDiv>
      </AlertWrapDiv>
    ),
    post: (
      <AlertWrapDiv>
        <AlertTextP>게시글을 삭제할까요?</AlertTextP>
        <AlertBottomDiv>
          <AlertDeleteBtn>취소</AlertDeleteBtn>
          <AlertLineSpan></AlertLineSpan>
          <AlertMainBtn>삭제</AlertMainBtn>
        </AlertBottomDiv>
      </AlertWrapDiv>
    ),
    product: (
      <AlertWrapDiv>
        <AlertTextP>상품을 삭제할까요?</AlertTextP>
        <AlertBottomDiv>
          <AlertDeleteBtn>취소</AlertDeleteBtn>
          <AlertLineSpan></AlertLineSpan>
          <AlertMainBtn>삭제</AlertMainBtn>
        </AlertBottomDiv>
      </AlertWrapDiv>
    ),
  };

  return UI[type];
}
