import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ImgStar from "../../assets/images/star.svg";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const RecommendWrapDiv = styled.div`
  width: 100%;
  padding: 20px 16px 8px;
  overflow: auto;
  box-sizing: border-box;
  background-color: white;
  border-bottom: 1px solid #dbdbdb;
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
  display: block;
  width: 140px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
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
  margin-bottom: 8px;
`;

export default function RecommendList({ cardOpen, cardClose, cardClosed }) {
  const [recommendInfo, setRecommendInfo] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [uploadList, setUploadList] = useState(cardClosed);
  useEffect(() => {
    getUserInfo();
    if (cardClosed) {
      getUserInfo();
    }
  }, [location, cardClosed]);

  const getUserInfo = async () => {
    const { accountname } = location.state || {};
    const token = localStorage.getItem("token");
    try {
      let apiUrl = `https://api.mandarin.weniv.co.kr/product/${accountname}/?limit=Number&skip=Number`;

      if (!accountname) {
        const loggedInAccountname = localStorage.getItem("accountname");
        apiUrl = `https://api.mandarin.weniv.co.kr/product/${loggedInAccountname}/?limit=Number&skip=Number`;
      }

      const res = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      });

      const products = res.data.product;
      setRecommendInfo(products);
      setUploadList(!cardClosed);
    } catch (error) {
      console.log("error");
      navigate("/error");
    }
  };

  if (recommendInfo.length === 0) {
    return null;
  }

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
              <RecommendStarImg src={ImgStar} alt="" />
              <RecommendScoreSpan>{recommendation.price}.0</RecommendScoreSpan>
            </RecommendLiBtn>
          </li>
        ))}
      </RecommendListUl>
    </RecommendWrapDiv>
  );
}
