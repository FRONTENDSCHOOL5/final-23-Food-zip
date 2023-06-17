import React from "react";
import styled from "styled-components";
import ListImg from "../../assets/images/list-example.png";

const RecommendWrapDiv = styled.div`
  margin: 20px 16px 8px;
  overflow: auto;
  box-sizing: border-box;
  background-color: white;
  &::-webkit-scrollbar {
    height: 12px;
  }
  &::-webkit-scrollbar-thumb {
    background: #dbdbdb;
    border-radius: 50px;
    background-clip: padding-box;
    border: 3px solid transparent;
  }
`;

const RecommendTitleP = styled.p`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const RecommendListUl = styled.ul`
  display: flex;
  gap: 10px;
`;

const RecommendLiBtn = styled.button`
  text-align: left;
`;

const RecommendListImg = styled.img`
  width: 140px;
  height: 90px;
  object-fit: cover;
  border-radius: 8px;
`;

const RecommendNameP = styled.p`
  font-size: 14px;
  margin: 6px 0 2px;
  /* font-weight: 600; */
`;

const RecommendScoreSpan = styled.span`
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  color: #286140;
  margin-bottom: 8px;
`;

export default function RecommendList() {
  return (
    <RecommendWrapDiv>
      <RecommendTitleP>추천 맛집</RecommendTitleP>
      <RecommendListUl>
        {/* {recommendations.map((recommendation, index) => (
          <li key={index}>
            <RecommendLiBtn type="button">
              <RecommendListImg src={recommendation.image} alt="" />
              <RecommendNameP>{recommendation.name}</RecommendNameP>
              <RecommendPriceSpan>{recommendation.price}</RecommendPriceSpan>
            </RecommendLiBtn>
          </li>
        ))} */}
        <li>
          <RecommendLiBtn type="button">
            <RecommendListImg src={ListImg} alt="" />
            <RecommendNameP>애월읍 노지 감귤</RecommendNameP>
            <RecommendScoreSpan>35,000원</RecommendScoreSpan>
          </RecommendLiBtn>
        </li>
        <li>
          <RecommendLiBtn type="button">
            <RecommendListImg src={ListImg} alt="" />
            <RecommendNameP>애월읍 노지 감귤</RecommendNameP>
            <RecommendScoreSpan>35,000원</RecommendScoreSpan>
          </RecommendLiBtn>
        </li>
        <li>
          <RecommendLiBtn type="button">
            <RecommendListImg src={ListImg} alt="" />
            <RecommendNameP>애월읍 노지 감귤</RecommendNameP>
            <RecommendScoreSpan>35,000원</RecommendScoreSpan>
          </RecommendLiBtn>
        </li>
        <li>
          <RecommendLiBtn type="button">
            <RecommendListImg src={ListImg} alt="" />
            <RecommendNameP>애월읍 노지 감귤</RecommendNameP>
            <RecommendScoreSpan>35,000원</RecommendScoreSpan>
          </RecommendLiBtn>
        </li>
        <li>
          <RecommendLiBtn type="button">
            <RecommendListImg src={ListImg} alt="" />
            <RecommendNameP>애월읍 노지 감귤</RecommendNameP>
            <RecommendScoreSpan>35,000원</RecommendScoreSpan>
          </RecommendLiBtn>
        </li>
      </RecommendListUl>
    </RecommendWrapDiv>
  );
}
