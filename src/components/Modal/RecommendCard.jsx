import React from "react";
import styled, { css } from "styled-components";
import ListImg from "../../assets/images/list-example.png";
import closeBtn from "../../assets/images/x-gray.svg";

const RecommendDiv = styled.div`
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

const RecommendCardDiv = styled.div`
  /* width: 304px; */
  /* height: 280px; */
  background-color: white;
  border-radius: 10px;
  padding: 28px 25px 24px 25px;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const RecommendListImg = styled.img`
  width: 260px;
  height: 168px;
  object-fit: cover;
  border-radius: 8px;
`;

const RecommendCommonText = css`
  font-size: 15px;
  font-weight: 600;
`;

const RecommendNameP = styled.p`
  ${RecommendCommonText}
  margin: 18px 0 7px;
`;

const RecommendScoreSpan = styled.span`
  ${RecommendCommonText}
  color: #286140;
`;

const RecommendLocationP = styled.p`
  font-size: 15px;
  margin: 7px 0 0px;
`;

const RecommendCloseBtn = styled.button`
  position: absolute;
  top: 1.5%;
  right: 0.8%;
`;

const RecommendCloseImg = styled.img`
  width: 24px;
`;

export default function RecommendCard({ cardClose }) {
  return (
    <RecommendDiv>
      <RecommendCardDiv>
        <RecommendListImg src={ListImg} alt="" />
        <RecommendNameP>애월읍 노지 감귤</RecommendNameP>
        <RecommendScoreSpan>35,000원</RecommendScoreSpan>
        <RecommendLocationP>
          서울 강남구 강남대로 358 2층 201호
        </RecommendLocationP>
        <RecommendCloseBtn type="button">
          <RecommendCloseImg
            src={closeBtn}
            alt="닫기 버튼"
            onClick={cardClose}
          />
        </RecommendCloseBtn>
      </RecommendCardDiv>
    </RecommendDiv>
  );
}
