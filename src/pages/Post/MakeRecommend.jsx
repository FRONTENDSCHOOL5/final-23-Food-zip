import React, { useState, useEffect } from "react";
import styled from "styled-components";
import RecommendImgPrev from "../../components/Post/ImgPrev/RecommendImgPrev";
import StarRating from "../../components/Post/StarRating/StarRating";
import Header from "../../components/common/Header/Header";
import { useNavigate } from "react-router-dom";
import { imgUpload } from "../../api/imgUpload";
import { recommendUploadApi } from "../../api/recommend";

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
const Restaurant = styled.div`
  position: relative;
`;
const SearchAddressButton = styled.button`
  position: absolute;
  right: 0%;
  bottom: 5px;
  display: inline-block;
  margin-left: 5px;
  background-color: #629678;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 10px;
  font-weight: bold;
  cursor: pointer;
`;
const StyledSelect = styled.select`
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
  cursor: pointer;
  /* appearance: none; */
`;
const { kakao } = window;
export default function MakeRecommend() {
  const [imgFile, setImgFile] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [restaurantname, setRestaurantname] = useState("");
  // const [address, setAddress] = useState("");
  const token = localStorage.getItem("token");
  const [rating, setRating] = useState(0);
  const [isValid, setIsValid] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const navigate = useNavigate();

  const handleRatingChange = rate => {
    setRating(rate);
  };
  const handleImageUrlChange = (file, url) => {
    setImgFile(file);
    setImgUrl(url);
  };
  const uploadRecommend = async () => {
    try {
      const formData = new FormData();
      formData.append("image", imgFile);
      const uploadResponse = await imgUpload(formData);
      const imageUrl =
        "https://api.mandarin.weniv.co.kr/" + uploadResponse.data.filename;

      await recommendUploadApi(
        restaurantname,
        rating,
        selectedAddress,
        imageUrl,
        token,
      );
      navigate("/myprofile");
    } catch (error) {
      console.error(error);
      navigate("/error");
    }
  };

  const handleUpload = () => {
    if (isValid) {
      uploadRecommend(imgUrl, restaurantname, rating, selectedAddress);
    } else {
      alert("입력이 안된 부분이 있습니다.");
    }
  };

  const checkContent = () => {
    if (restaurantname.trim().length === 0 || !imgFile) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };
  useEffect(() => {
    checkContent();
  }, [restaurantname, rating, selectedAddress, imgFile]);

  const onChangeName = event => {
    setRestaurantname(event.target.value);
    checkContent();
  };

  const placesSearchCB = (data, status, pagination) => {
    if (status === kakao.maps.services.Status.OK) {
      console.log("해당 가게의 주소는", data);
      setAddressList(data);
      setSelectedAddress(data[0].road_address_name);
    }
  };

  const onButtonClick = event => {
    event.preventDefault(); // 이벤트 버블링 방지
    console.log("현재 가게 이름", restaurantname);
    if (restaurantname) {
      console.log("검색 수행");
      const ps = new kakao.maps.services.Places();
      ps.keywordSearch(restaurantname, placesSearchCB);
    } else {
      alert("음식점 이름을 입력해주세요.");
    }
  };
  const onAddressChange = event => {
    setSelectedAddress(event.target.value);
    console.log("선택된 가게는", selectedAddress);
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
          <Restaurant>
            <RecommendLabel htmlFor="restaurantName">음식점</RecommendLabel>
            <RecommendInfo
              id="restaurantName"
              type="text"
              value={restaurantname}
              onChange={onChangeName}
            />
            <SearchAddressButton onClick={onButtonClick} type="button">
              검색
            </SearchAddressButton>
          </Restaurant>
          <StarRating onRatingChange={handleRatingChange} />
          <RecommendLabel htmlFor="addresslist">주소</RecommendLabel>
          {addressList.length > 0 && (
            <StyledSelect
              id="addresslist"
              onChange={onAddressChange}
              defaultValue={selectedAddress}
            >
              {addressList.map((address, index) => (
                <option key={index} value={address.road_address_name}>
                  {address.place_name} ({address.road_address_name})
                </option>
              ))}
            </StyledSelect>
          )}
        </form>
      </RecommendWrapper>
    </>
  );
}
