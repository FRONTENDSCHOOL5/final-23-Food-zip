import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import ListImg from "../../assets/images/list-example.png";
import axios from "axios";
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
  height: 260px;
  background-color: white;
  border-radius: 10px;
  padding: 23px 33px;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

export default function RecommendCard({ cardClose, id }) {
  const [recommendInfo, setRecommendInfo] = useState({
    postimage: "",
    restaurantname: "",
    price: "",
    address: "",
  });
  useEffect(() => {
    getUserInfo();
  }, [id]);
  // const [selectedId, setSelectedId] = useState(null);

  const getUserInfo = async () => {
    const token = localStorage.getItem("token");
    console.log(id);
    // const accountname = localStorage.getItem("accountname");
    console.log(token);
    const res = await axios.get(
      `https://api.mandarin.weniv.co.kr/product/detail/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      },
    );
    console.log(res.data);
    const { itemImage, itemName, link, price } = res.data.product;
    setRecommendInfo({
      itemImage,
      itemName,
      link,
      price,
    });
  };
  console.log(recommendInfo);
  return (
    <RecommendDiv onClick={cardClose}>
      <RecommendCardDiv>
        <RecommendListImg src={recommendInfo.itemImage} alt="" />
        <RecommendNameP>{recommendInfo.itemName}</RecommendNameP>
        <RecommendScoreSpan>{recommendInfo.price}</RecommendScoreSpan>
        <RecommendLocationP>{recommendInfo.link}</RecommendLocationP>
      </RecommendCardDiv>
    </RecommendDiv>
  );
}
