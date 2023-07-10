import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import IconMoreVertical from "../../assets/images/icon-more-vertical.svg";
import ImgStar from "../../assets/images/star.svg";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import RecommendEdit from "../Post/PostEdit/RecommendEdit";
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

const RecommendCardArticle = styled.article`
  width: 304px;
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

const RecommendTextSection = styled.section`
  padding: 13px;
  position: relative;
`;

const RecommendName = styled.h3`
  font-size: 17px;
  margin-bottom: 13px;
  font-weight: 600;
  display: inline-block;
  width: 240px;
  line-height: 20px;
`;

const RecommendScoreSpan = styled.span`
  display: inline-block;
  color: #000;
  position: relative;
  padding-left: 23px;
  font-size: 15px;
  font-weight: 600;
  line-height: 16px;
  &::after {
    display: block;
    content: "";
    width: 16px;
    height: 16px;
    background-image: url(${ImgStar});
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    top: 45%;
    left: 4px;
    transform: translateY(-50%);
  }
`;

const RecommendLocationP = styled.p`
  font-size: 15px;
  margin-bottom: 27px;
  line-height: 17px;
`;

const RecommendMoreBtn = styled.button`
  position: absolute;
  top: 7%;
  right: 1%;
`;

const RecommendCloseBtn = styled.button`
  font-size: 14px;
  font-weight: 600;
`;

export default function RecommendCard({ cardClose, id, modalOpen }) {
  const location = useLocation();
  const { accountname } = location.state || {};
  const [recommendInfo, setRecommendInfo] = useState({
    postimage: "",
    restaurantname: "",
    price: "",
    address: "",
    // author: "",
  });
  const navigation = useNavigate();
  const [recommendEditModalOpen, setRecommendEditModalOpen] = useState(false);
  const [shouldFetchProductInfo, setShouldFetchProductInfo] = useState(false);
  useEffect(() => {
    getUserInfo();
  }, [id]);

  const getUserInfo = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        `https://api.mandarin.weniv.co.kr/product/detail/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        },
      );
      const { itemImage, itemName, link, price } = res.data.product;
      setRecommendInfo({
        itemImage,
        itemName,
        link,
        price,
      });
      setShouldFetchProductInfo(false);
    } catch (err) {
      navigation("/error");
    }
  };

  const [modalShow, setModalShow] = useState(false);
  function modalClose(e) {
    if (e.target === e.currentTarget) {
      setModalShow(false);
    }
  }

  function modalOpen() {
    setModalShow(true);
  }
  const openRecommendEditModal = () => {
    setRecommendEditModalOpen(true);
  };
  const closeRecommendEditModal = () => {
    setRecommendEditModalOpen(false);
    setShouldFetchProductInfo(true);
    setModalShow(false);
    getUserInfo();
  };
  useEffect(() => {
    if (shouldFetchProductInfo) {
      getUserInfo();
    }
  }, [shouldFetchProductInfo]);
  return (
    <RecommendDiv>
      <RecommendCardArticle>
        <h2 className="a11y-hidden">추천 맛집</h2>
        <RecommendListImg src={recommendInfo.itemImage} alt="" />
        <RecommendTextSection>
          <RecommendName>
            {recommendInfo.itemName}
            <RecommendScoreSpan>{recommendInfo.price}.0</RecommendScoreSpan>
          </RecommendName>
          <RecommendLocationP>{recommendInfo.link}</RecommendLocationP>
          <RecommendMoreBtn type="button" onClick={modalOpen}>
            <img src={IconMoreVertical} alt="더보기 아이콘" />
          </RecommendMoreBtn>
          <RecommendCloseBtn type="button" onClick={cardClose}>
            &#60; 닫기
          </RecommendCloseBtn>
        </RecommendTextSection>
      </RecommendCardArticle>
      {modalShow && (
        <Modal
          type={!accountname ? "product" : "yourproduct"}
          modalClose={modalClose}
          productId={id}
          restaurantName={recommendInfo.itemName}
          handlerRecommendEdit={openRecommendEditModal}
        />
      )}
      {recommendEditModalOpen && (
        <RecommendEdit closeModal={closeRecommendEditModal} productId={id} />
      )}
    </RecommendDiv>
  );
}
