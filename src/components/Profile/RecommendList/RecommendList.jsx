import React, { useEffect, useState } from "react";
import ImgStar from "../../../assets/images/star.svg";
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
import { recommendListApi } from "../../../api/recommend";

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
      const res = await recommendListApi(
        accountname || localStorage.getItem("accountname"),
        token,
      );
      setRecommendInfo(res.data.product);
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
              <RecommendListImg
                src={recommendation.itemImage}
                alt="추천맛집 사진"
              />
              <RecommendNameP>{recommendation.itemName}</RecommendNameP>
              <RecommendStarImg src={ImgStar} alt="별평점" />
              <RecommendScoreSpan>{recommendation.price}.0</RecommendScoreSpan>
            </RecommendLiBtn>
          </li>
        ))}
      </RecommendListUl>
    </RecommendWrap>
  );
}
