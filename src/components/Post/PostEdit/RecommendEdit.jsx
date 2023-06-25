import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../common/Header/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import IconArrowLeft from "../../../assets/images/icon-arrow-left.svg";
import Button from "../../common/Button/Button";
import StarRating from "../StarRating/StarRating";
import { RecommendLabel } from "../../../pages/Post/MakeRecommend";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const EditContainer = styled.form`
  width: 300px;
`;
const ProductImage = styled.img`
  display: block;
  width: 100%;
  height: 180px;
  /* width: 250px; */
  border-radius: 10px;
  margin-bottom: 30px;
`;
const HeaderLayoutDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  border-bottom: 1px solid #dbdbdb;
  box-sizing: border-box;
  margin-bottom: 30px;
  background-color: white;
`;
const HeaderLeftBtn = styled.button`
  border: 0;
  padding: 10px;
  padding-left: 0;
  background-color: transparent;
`;
const ModalContent = styled.div`
  background-color: #fff;
  padding: 0 20px 10px 20px;
  border-radius: 5px;
`;

const RecommendInfo = styled.input`
  display: block;
  width: 300px;
  box-sizing: border-box;
  border: none;
  box-shadow: 0 1px 0 0 #dedede;
  height: 42px;
  font-size: 14px;
  margin: 0 auto 30px auto;
  outline: none;
  background: transparent;
  padding: 6px 0 0;
  &:focus {
    border-bottom: 1px solid #629678;
  }
`;
export default function RecommendEdit({ closeModal, productId }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [productInfo, setProductInfo] = useState({});
  useEffect(() => {
    // 컴포넌트가 마운트될 때 게시물 정보 가져오기
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
      console.log("이 상품은", product);
      setProductInfo(product);
      console.log("기존 게시글 정보", product);
    } catch (error) {
      console.error(error);
      navigate("/error");
    }
  };
  console.log(productInfo);
  const recommendEditUpload = async () => {
    console.log();
    // event.preventDefault();
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
      console.log("새 게시물", productInfo);
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
              // onClick={closeModal}
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
