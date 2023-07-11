import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import IconMoreVertical from "../../../assets/images/icon-more-vertical.svg";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import RecommendEdit from "../../Post/PostEdit/RecommendEdit";
import {
  RecommendDiv,
  RecommendCardArticle,
  RecommendListImg,
  RecommendTextSection,
  RecommendName,
  RecommendScoreSpan,
  RecommendLocationP,
  RecommendMoreBtn,
  RecommendCloseBtn,
} from "./RecommendCardStyle";

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
        <h3 className="a11y-hidden">추천 맛집 카드</h3>
        <RecommendListImg src={recommendInfo.itemImage} alt="" />
        <RecommendTextSection>
          <RecommendName>{recommendInfo.itemName}</RecommendName>
          <RecommendScoreSpan>{recommendInfo.price}.0</RecommendScoreSpan>
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
