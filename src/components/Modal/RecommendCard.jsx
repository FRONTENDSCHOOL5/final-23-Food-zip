import React from "react";
import styled, { css } from "styled-components";
import ListImg from "../../assets/images/list-example.png";

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
  width: 304px;
  /* height: 320px; */
  background-color: white;
  border-radius: 10px;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const RecommendListImg = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
`;

const RecommendTextDiv = styled.div`
  padding: 13px;
`;

const RecommendCommonText = css`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 7px;
`;

const RecommendNameP = styled.p`
  ${RecommendCommonText}
`;

const RecommendScoreSpan = styled.span`
  display: inline-block;
  ${RecommendCommonText}
  color: #286140;
`;

const RecommendLocationP = styled.p`
  font-size: 15px;
  margin-bottom: 16px;
`;

const RecommendCloseBtn = styled.button`
  font-size: 15px;
  font-weight: 600;
`;

export default function RecommendCard({ cardClose }) {
  return (
    <RecommendDiv>
      <RecommendCardDiv>
        <RecommendListImg src={ListImg} alt="" />
        <RecommendTextDiv>
          <RecommendNameP>애월읍 노지 감귤</RecommendNameP>
          <RecommendScoreSpan>35,000원</RecommendScoreSpan>
          <RecommendLocationP>
            서울 강남구 강남대로 358 2층 201호
          </RecommendLocationP>
          <RecommendCloseBtn type="button" onClick={cardClose}>
            &#62; 닫기
          </RecommendCloseBtn>
        </RecommendTextDiv>
      </RecommendCardDiv>
    </RecommendDiv>
  );
}
