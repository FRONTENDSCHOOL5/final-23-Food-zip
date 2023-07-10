import React, { useEffect, useState } from "react";
import ImgStar from "../../../assets/images/star.svg";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import {
  RecommendWrap,
  RecommendTitle,
  RecommendListUl,
  RecommendLiBtn,
  RecommendListImg,
  RecommendNameP,
  RecommendScoreSpan,
  RecommendStarImg,
} from "./RecommendListStyle";

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
    <RecommendWrap>
      <RecommendTitle>추천 맛집</RecommendTitle>
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
    </RecommendWrap>
  );
}
