import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  RecommendWrap,
  RecommendTitle,
  RecommendListUl,
  RecommendLiBtn,
  RecommendListImg,
  RecommendNameP,
  RecommendScoreSpan,
  TitleWrapper,
} from "./RecommendListStyle";
import { recommendListApi } from "../../../api/recommend";
import sprite from "../../../assets/images/SpriteIcon.svg";

export default function RecommendList({ cardOpen, cardClose, cardClosed }) {
  const SocialSVG = ({ id, color = "white", size = 15 }) => (
    <svg fill={color} width={size} height={size}>
      <use href={`${sprite}#${id}`} />
    </svg>
  );
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
              <TitleWrapper>
                <SocialSVG id="star" />
                <RecommendScoreSpan>
                  {recommendation.price}.0
                </RecommendScoreSpan>
              </TitleWrapper>
            </RecommendLiBtn>
          </li>
        ))}
      </RecommendListUl>
    </RecommendWrap>
  );
}
