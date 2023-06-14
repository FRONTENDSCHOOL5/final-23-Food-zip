import React, { useState } from "react";
import styled from "styled-components";
import { Rating } from "react-simple-star-rating";
import RecommendImgPrev from "../../components/Post/ImgPrev/RecommendImgPrev";
import StarRating from "../../components/Post/StarRating/StarRating";
import Header from "../../components/common/Header/Header";

const RecommendWrapper = styled.div`
  padding: 78px 36px;
  background: #fff;
  height: calc(100vh - 48px);
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
  return (
    <>
      <Header type="upload" active={true} />
      <RecommendWrapper>
        <form>
          <RecommendImgPrev />
          <label htmlFor="restaurantName">음식점</label>
          <RecommendInfo id="restaurantName" type="text" />
          <StarRating />
          <label htmlFor="address">주소</label>
          <RecommendInfo id="address" type="text" />
        </form>
      </RecommendWrapper>
    </>
  );
}

//지도 API 연결 (추후)
