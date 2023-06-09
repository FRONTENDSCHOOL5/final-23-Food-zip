import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StarRating from "../StarRating/StarRating";
import IconArrowLeft from "../../../assets/images/icon-arrow-left.svg";
import Button from "../../common/Button/Button";
import { RecommendLabel } from "../../../pages/Post/MakeRecommend";
import {
  RecommendInfo,
  ModalContent,
  ModalOverlay,
  HeaderLayoutDiv,
  HeaderLeftBtn,
  EditContainer,
  ProductImage,
} from "./RecommendEditStyle";

export default function RecommendEdit({ closeModal, productId }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [productInfo, setProductInfo] = useState({});
  useEffect(() => {
    fetchProductInfo();
  }, []);

  const fetchProductInfo = async () => {
    try {
      const response = await axios.get(
        `https://api.mandarin.weniv.co.kr/product/detail/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        },
      );
      const product = response.data.product;
      setProductInfo(product);
    } catch (error) {
      console.error(error);
      navigate("/error");
    }
  };
  const recommendEditUpload = async () => {
    try {
      const res = await axios.put(
        `https://api.mandarin.weniv.co.kr/product/${productId}`,
        {
          product: {
            itemName: productInfo.itemName,
            price: productInfo.price,
            link: productInfo.link,
            itemImage: productInfo.itemImage,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        },
      );
      const updatedProduct = res.data.product;
      setProductInfo(updatedProduct);
      closeModal();
    } catch (error) {
      console.error(error);
      navigate("/error");
      return false;
    }
  };

  function handleUpload() {
    recommendEditUpload(
      productInfo.itemName,
      productInfo.price,
      productInfo.link,
      productInfo.itemImage,
    );
  }
  return (
    <ModalOverlay onClick={closeModal}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <EditContainer>
          <HeaderLayoutDiv>
            <HeaderLeftBtn type="button">
              <img
                src={IconArrowLeft}
                alt="뒤로가기 아이콘"
                onClick={closeModal}
              />
            </HeaderLeftBtn>
            <Button
              type="submit"
              content="저장"
              size="ms"
              width="ms"
              bgColor="active"
              onClick={handleUpload}
            ></Button>
          </HeaderLayoutDiv>
          {productInfo.itemImage !== "" && (
            <ProductImage src={productInfo.itemImage} alt="게시물 사진" />
          )}
          <RecommendLabel htmlFor="restaurantName">음식점</RecommendLabel>
          <RecommendInfo
            id="restaurantName"
            type="text"
            value={productInfo.itemName || ""}
            onChange={e =>
              setProductInfo({
                ...productInfo,
                itemName: e.target.value,
              })
            }
          />
          <StarRating
            onRatingChange={rate =>
              setProductInfo({
                ...productInfo,
                price: rate,
              })
            }
          />
          <RecommendLabel htmlFor="address">주소</RecommendLabel>
          <RecommendInfo
            id="address"
            type="text"
            value={productInfo.link || ""}
            onChange={e =>
              setProductInfo({
                ...productInfo,
                link: e.target.value,
              })
            }
          />
        </EditContainer>
      </ModalContent>
    </ModalOverlay>
  );
}
