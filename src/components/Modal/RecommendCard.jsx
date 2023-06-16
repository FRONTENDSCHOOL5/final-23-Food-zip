import React from "react";
import styled, { css } from "styled-components";
import ListImg from "../../assets/images/list-example.png";

const RecommendCardDiv = styled.div`
  width: 304px;
  height: 260px;
  background-color: white;
  border-radius: 10px;
  padding: 23px 33px;
  box-sizing: border-box;
`;

const RecommendListImg = styled.img`
  width: 238px;
  height: 154px;
  object-fit: cover;
  border-radius: 8px;
`;

const RecommendCommonText = css`
  font-size: 14px;
  font-weight: 600;
`;

const RecommendNameP = styled.p`
  ${RecommendCommonText}
  margin: 10px 0 4px;
`;

const RecommendScoreSpan = styled.span`
  ${RecommendCommonText}
  color: #286140;
`;

const RecommendLocationP = styled.p`
  font-size: 14px;
  margin: 6px 0 0px;
`;

export default function RecommendCard() {
  return (
    <RecommendCardDiv>
      <RecommendListImg src={ListImg} alt="" />
      <RecommendNameP>애월읍 노지 감귤</RecommendNameP>
      <RecommendScoreSpan>35,000원</RecommendScoreSpan>
      <RecommendLocationP>
        서울 강남구 강남대로 358 2층 201호
      </RecommendLocationP>
    </RecommendCardDiv>
  );
}
