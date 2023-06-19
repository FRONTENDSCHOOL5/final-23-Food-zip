import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Modal from "./Modal";
import IconMoreVertical from "../../assets/images/icon-more-vertical.svg";
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

const RecommendMoreBtn = styled.button`
  position: absolute;
  bottom: 29%;
  left: 90%;
`;

const RecommendCloseBtn = styled.button`
  font-size: 15px;
  font-weight: 600;
`;

export default function RecommendCard({ cardClose, id, modalOpen }) {
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

  const [modalShow, setModalShow] = useState(false);

  function modalClose(e) {
    if (e.target === e.currentTarget) {
      setModalShow(false);
    }
  }

  function modalOpen(type) {
    setModalShow(true);
  }
  return (
    <RecommendDiv>
      <RecommendCardDiv>
        <RecommendListImg src={recommendInfo.itemImage} alt="" />
        <RecommendTextDiv>
          <RecommendNameP>{recommendInfo.itemName}</RecommendNameP>
          <RecommendScoreSpan>{recommendInfo.price}</RecommendScoreSpan>
          <RecommendLocationP>{recommendInfo.link}</RecommendLocationP>
          <RecommendMoreBtn type="button" onClick={modalOpen}>
            <img src={IconMoreVertical} alt="더보기 아이콘" />
          </RecommendMoreBtn>
          <RecommendCloseBtn type="button" onClick={cardClose}>
            &#62; 닫기
          </RecommendCloseBtn>
        </RecommendTextDiv>
      </RecommendCardDiv>
      {modalShow && <Modal type="product" modalClose={modalClose} />}
    </RecommendDiv>
  );
}
