import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ListImg from "../../assets/images/list-example.png";
import RecommendCard from "../Modal/RecommendCard";
import ImgStar from "../../assets/images/star.svg";
import axios from "axios";
const RecommendWrapDiv = styled.div`
  width: 100%;
  padding: 20px 16px 2px;
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
  gap: 8px;
  & :last-child {
    padding-right: 8px;
  }
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
  font-size: 14px;
  font-weight: 600;
  color: #000;
  margin-left: 2px;
  line-height: 17px;
`;

const RecommendStarImg = styled.img`
  display: inline-block;
  width: 15px;
  vertical-align: top;
  margin-bottom: 10px;
`;

export default function RecommendList({ cardOpen, cardClose }) {
  const [recommendInfo, setRecommendInfo] = useState([]);
  useEffect(() => {
    getUserInfo();
  }, []);
  const getUserInfo = async () => {
    const token = localStorage.getItem("token");
    const accountname = localStorage.getItem("accountname");
    console.log(token);
    const res = await axios.get(
      `https://api.mandarin.weniv.co.kr/product/${accountname}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      },
    );
    // console.log(res.data);
    // console.log(res.data.product);
    // console.log(res.data.product[0].id);
    const products = res.data.product;
    setRecommendInfo(products);
  };
  // console.log("여기");
  // console.log(recommendInfo[0].id);
  return (
    <RecommendWrapDiv>
      <RecommendTitleP>추천 맛집</RecommendTitleP>
      <RecommendListUl>
        {recommendInfo.map(recommendation => (
          <li
            key={recommendation.id}
            onClick={() => cardOpen(recommendation.id)}
          >
            <RecommendLiBtn type="button">
              <RecommendListImg src={recommendation.itemImage} alt="" />
              <RecommendNameP>{recommendation.itemName}</RecommendNameP>
              {/* <RecommendScoreSpan>
                {recommendation.price} / 5점
              </RecommendScoreSpan> */}
              <RecommendStarImg src={ImgStar} alt="" />
              <RecommendScoreSpan>{recommendation.price}.0</RecommendScoreSpan>
            </RecommendLiBtn>
          </li>
        ))}
      </RecommendListUl>
    </RecommendWrapDiv>
  );
}
