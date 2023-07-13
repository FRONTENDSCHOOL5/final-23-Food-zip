import React, { useState } from "react";
import styled from "styled-components";
import RecommendImgPrev from "../../components/Post/ImgPrev/RecommendImgPrev";
import StarRating from "../../components/Post/StarRating/StarRating";
import Header from "../../components/common/Header/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const RecommendWrapper = styled.section`
  padding: 78px 36px;
  background: #fff;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
`;

export const RecommendLabel = styled.label`
  display: inline-block;
  font-size: 15px;
  font-weight: 900;
  color: #186738;
`;
const RecommendInfo = styled.input`
  display: block;
  width: 318px;
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

export default function MakeRecommend() {
  const [imgFile, setImgFile] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [restaurantname, setRestaurantname] = useState("");
  const [address, setAddress] = useState("");
  const token = localStorage.getItem("token");
  const [rating, setRating] = useState(0);
  const [isValid, setIsValid] = useState(false);

  const navigate = useNavigate();

  const handleRatingChange = rate => {
    setRating(rate);
  };
  const handleImageUrlChange = (file, url) => {
    setImgFile(file);
    setImgUrl(url);
  };
  const uploadPost = async () => {
    try {
      const formData = new FormData();
      formData.append("image", imgFile);
      const uploadResponse = await axios.post(
        "https://api.mandarin.weniv.co.kr/image/uploadfile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      const imageUrl =
        "https://api.mandarin.weniv.co.kr/" + uploadResponse.data.filename;

      await axios.post(
        "https://api.mandarin.weniv.co.kr/product",
        {
          product: {
            itemName: restaurantname,
            price: rating, //별 평점
            link: address, //주소
            itemImage: imageUrl,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      navigate("/myprofile");
    } catch (error) {
      console.error(error);
      navigate("/error");
    }
  };

  const handleUpload = () => {
    if (isValid) {
      uploadPost(imgUrl, restaurantname, rating, address);
    } else {
      alert("입력이 안된 부분이 있습니다.");
    }
  };

  const checkContent = () => {
    if (
      restaurantname.trim().length === 0 ||
      address.trim().length === 0 ||
      !imgFile
    ) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };
  useEffect(() => {
    checkContent();
  }, [restaurantname, rating, address, imgFile]);
  const onChangeName = event => {
    setRestaurantname(event.target.value);
    checkContent();
  };

  const onChangeAddress = event => {
    setAddress(event.target.value);
    checkContent();
  };
  return (
    <>
      <h1 className="a11y-hidden">추천맛집 작성 페이지</h1>
      <Header
        type="upload"
        handleUploadBtn={isValid}
        uploadHandler={handleUpload}
      />
      <RecommendWrapper>
        <form>
          <RecommendImgPrev onRecommendImageUrlChange={handleImageUrlChange} />
          <RecommendLabel htmlFor="restaurantName">음식점</RecommendLabel>
          <RecommendInfo
            id="restaurantName"
            type="text"
            value={restaurantname}
            onChange={onChangeName}
          />
          <StarRating onRatingChange={handleRatingChange} />
          <RecommendLabel htmlFor="address">주소</RecommendLabel>
          <RecommendInfo
            id="address"
            type="text"
            value={address}
            onChange={onChangeAddress}
          />
        </form>
      </RecommendWrapper>
    </>
  );
}
