import React from "react";
import styled from "styled-components";
import ListImg from "../../assets/images/list-example.png";

const RecommendWrapDiv = styled.div`
  width: 100%;
  padding: 20px 16px 16px;
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
  /* & :last-child {
    padding-right: 16px;
  } */
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
            <RecommendPriceSpan>35,000원</RecommendPriceSpan>
          </RecommendLiBtn>
        </li>
      </RecommendListUl>
    </RecommendWrapDiv>
  );
}
