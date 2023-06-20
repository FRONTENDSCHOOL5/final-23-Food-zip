import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const AlertDiv = styled.div`
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

const AlertWrapDiv = styled.div`
  width: 252px;
  background-color: white;
  border-radius: 10px;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const AlertTextP = styled.p`
  padding: 22px 56px;
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

const AlertCancelBtn = styled.button`
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

export default function Alert({ type, alertClose, id, modalClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const onClickLogout = () => {
    localStorage.removeItem("token");
    navigate("/welcome");
  };

  const handleDeletePost = async () => {
    const token = localStorage.getItem("token");
    console.log("여기", token);
    console.log("id", id);
    try {
      await axios.delete(`https://api.mandarin.weniv.co.kr/post/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      });
      alertClose("post");
      modalClose("modification");
      window.location.reload();
    } catch (error) {
      console.error("Delete request failed", error);
    }
  };

  const UI = {
    logout: (
      <AlertWrapDiv>
        <AlertTextP>로그아웃하시겠어요?</AlertTextP>
        <AlertBottomDiv>
          <AlertCancelBtn onClick={alertClose}>취소</AlertCancelBtn>
          <AlertLineSpan></AlertLineSpan>
          <AlertMainBtn onClick={onClickLogout}>로그아웃</AlertMainBtn>
        </AlertBottomDiv>
      </AlertWrapDiv>
    ),
    post: (
      <AlertWrapDiv>
        <AlertTextP>게시글을 삭제할까요?</AlertTextP>
        <AlertBottomDiv>
          <AlertCancelBtn onClick={alertClose}>취소</AlertCancelBtn>
          <AlertLineSpan></AlertLineSpan>
          <AlertMainBtn onClick={handleDeletePost}>삭제</AlertMainBtn>
        </AlertBottomDiv>
      </AlertWrapDiv>
    ),
    product: (
      <AlertWrapDiv>
        <AlertTextP>상품을 삭제할까요?</AlertTextP>
        <AlertBottomDiv>
          <AlertCancelBtn onClick={alertClose}>취소</AlertCancelBtn>
          <AlertLineSpan></AlertLineSpan>
          <AlertMainBtn>삭제</AlertMainBtn>
        </AlertBottomDiv>
      </AlertWrapDiv>
    ),
  };

  return <AlertDiv>{UI[type]}</AlertDiv>;
}
