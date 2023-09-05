import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
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
  TitleWrapper,
} from "./RecommendCardStyle";
import { getRecommendInfoApi } from "../../../api/recommend";
import sprite from "../../../assets/images/SpriteIcon.svg";
import { useRecoilState } from "recoil";
import { modalState } from "../../../atoms/modalAtom";

export default function RecommendCard({ cardClose, id }) {
  const SocialSVG = ({ id, color = "white", size = 22 }) => (
    <svg fill={color} width={size} height={size}>
      <use href={`${sprite}#${id}`} />
    </svg>
  );
  const location = useLocation();
  const { accountname } = location.state || {};
  const [recommendInfo, setRecommendInfo] = useState({
    postimage: "",
    restaurantname: "",
    price: "",
    address: "",
  });
  const navigation = useNavigate();
  const [recommendEditModalOpen, setRecommendEditModalOpen] = useState(false);
  const [shouldFetchProductInfo, setShouldFetchProductInfo] = useState(false);
  const [modal, setModal] = useRecoilState(modalState);
  const modalOpen = () => {
    setModal({ show: true, type: !accountname ? "product" : "yourproduct" });
  };

  useEffect(() => {
    getUserInfo();
  }, [id]);

  const getUserInfo = async () => {
    const token = localStorage.getItem("token");
    try {
      await getRecommendInfoApi(id, token).then(res => {
        const { itemImage, itemName, link, price } = res.data.product;
        setRecommendInfo({
          itemImage,
          itemName,
          link,
          price,
        });
        setShouldFetchProductInfo(false);
      });
    } catch (err) {
      navigation("/error");
    }
  };
  const openRecommendEditModal = () => {
    setRecommendEditModalOpen(true);
  };
  const closeRecommendEditModal = () => {
    setRecommendEditModalOpen(false);
    setShouldFetchProductInfo(true);
    setModal(prevModal => ({ ...prevModal, show: false }));
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
          <TitleWrapper>
            <RecommendName>{recommendInfo.itemName}</RecommendName>
            <SocialSVG id="star" size="16px" />
            <RecommendScoreSpan>{recommendInfo.price}.0</RecommendScoreSpan>
          </TitleWrapper>
          <RecommendLocationP>{recommendInfo.link}</RecommendLocationP>
          <RecommendMoreBtn type="button" onClick={modalOpen}>
            <SocialSVG id="icon-more-vertical" />
          </RecommendMoreBtn>
          <RecommendCloseBtn type="button" onClick={cardClose}>
            &#60; 닫기
          </RecommendCloseBtn>
        </RecommendTextSection>
      </RecommendCardArticle>
      {modal.show && (
        <Modal
          type={modal.type}
          productId={id}
          restaurantName={recommendInfo.itemName}
          handlerRecommendEdit={openRecommendEditModal}
          recommendInfo={recommendInfo}
        />
      )}
      {recommendEditModalOpen && (
        <RecommendEdit closeModal={closeRecommendEditModal} productId={id} />
      )}
    </RecommendDiv>
  );
}
