import React from "react";
import styled from "styled-components";
import ListImg from "../../assets/images/list-example.png";

const RecommendWrapDiv = styled.div`
  width: 390px;
  box-shadow: inset 0 0 0 1px red;
  padding: 20px 16px;
  overflow: auto;
  box-sizing: border-box;
  background-color: white;
  /* -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  } */
`;

const RecommendTitleP = styled.p`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const RecommendListDiv = styled.div`
  display: flex;
  gap: 10px;
`;

const RecommendListImg = styled.img`
  width: 140px;
  height: 90px;
  object-fit: cover;
  border-radius: 8px;
`;

const RecommendNameP = styled.p`
  font-size: 14px;
  margin: 6px 0 4px;
`;

const RecommendPriceSpan = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #286140;
`;

export default function RecommendList() {
  return (
    <RecommendWrapDiv>
      <RecommendTitleP>추천 맛집</RecommendTitleP>
      <RecommendListDiv>
        <div>
          <RecommendListImg src={ListImg} alt="" />
          <RecommendNameP>애월읍 노지 감귤</RecommendNameP>
          <RecommendPriceSpan>35,000원</RecommendPriceSpan>
        </div>
        <div>
          <RecommendListImg src={ListImg} alt="" />
          <RecommendNameP>애월읍 노지 감귤</RecommendNameP>
          <RecommendPriceSpan>35,000원</RecommendPriceSpan>
        </div>
        <div>
          <RecommendListImg src={ListImg} alt="" />
          <RecommendNameP>애월읍 노지 감귤</RecommendNameP>
          <RecommendPriceSpan>35,000원</RecommendPriceSpan>
        </div>
        <div>
          <RecommendListImg src={ListImg} alt="" />
          <RecommendNameP>애월읍 노지 감귤</RecommendNameP>
          <RecommendPriceSpan>35,000원</RecommendPriceSpan>
        </div>
      </RecommendListDiv>
    </RecommendWrapDiv>
  );
}
