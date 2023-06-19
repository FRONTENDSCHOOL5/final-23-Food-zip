import React, { useState } from "react";
import styled from "styled-components";
import { Rating } from "react-simple-star-rating";
import RecommendImgPrev from "../../components/Post/ImgPrev/RecommendImgPrev";
import StarRating from "../../components/Post/StarRating/StarRating";
import Header from "../../components/common/Header/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RecommendWrapper = styled.div`
  padding: 78px 36px;
  background: #fff;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
`;
const RecommendInfo = styled.input`
  display: block;
  width: 322px;
  box-sizing: border-box;
  border: none;
  box-shadow: 0 1px 0 0 #677880;
  height: 48px;
  border-radius: 4px 4px 0 0;
  padding: 0 px;
  font-size: 16px;
  margin: 0 auto 36px auto;
  outline: none;
  background: transparent;
  &:focus {
    border-bottom: #629678;
  }
`;

export default function MakeRecommend() {
  const [imgFile, setImgFile] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [restaurantname, setRestaurantname] = useState("");
  const [address, setAddress] = useState("");
  const token = localStorage.getItem("token");
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  const handleRatingChange = rate => {
    setRating(rate);
    // Perform any other actions with the rating value
  };
  const handleImageUrlChange = (file, url) => {
    setImgFile(file);
    // const fileUrl = URL.createObjectURL(file);
    setImgUrl(url);
  };
  console.log(imgFile);
  const uploadPost = async (url, content) => {
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
      console.log("1 : " + uploadResponse.data);
      const imageUrl =
        "https://api.mandarin.weniv.co.kr/" + uploadResponse.data.filename;

      const postResponse = await axios.post(
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

      console.log(postResponse);
      navigate("/myprofile");
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpload = () => {
    uploadPost(imgUrl, restaurantname, rating, address);
  };

  const onChangeName = event => {
    setRestaurantname(event.target.value);
  };

  const onChangeAddress = event => {
    setAddress(event.target.value);
  };
  return (
    <>
      <Header type="upload" active={true} uploadHandler={handleUpload} />
      <RecommendWrapper>
        <form>
          <RecommendImgPrev onRecommendImageUrlChange={handleImageUrlChange} />
          <label htmlFor="restaurantName">음식점</label>
          <RecommendInfo
            id="restaurantName"
            type="text"
            value={restaurantname}
            onChange={onChangeName}
          />
          <StarRating onRatingChange={handleRatingChange} />
          <label htmlFor="address">주소</label>
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

//지도 API 연결 (추후)
