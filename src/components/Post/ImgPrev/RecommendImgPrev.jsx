import React from "react";
import { useRef, useState } from "react";
import styled from "styled-components";
import uploadPhoto from "../../../assets/images/camera-color.svg";

const RecommendImgInput = styled.input`
  display: none;
`;
const RecommendImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 0.5px solid #dbdbdb;
  border-radius: 10px;
`;
const EmptyBox = styled.div`
  background: #dbdbdb;
  margin-top: 5px;
  width: 100%;
  height: 204px;
  border-radius: 10px;
`;
const RecommendImgWrapper = styled.div`
  width: 100%;
  height: 236px;
  margin-bottom: 10px;
  position: relative;
`;
const ImgWrapper = styled.div`
  margin-top: 5px;
  width: 100%;
  height: 204px;
`;
const RecommendIconWrapper = styled.label`
  display: inline-block;
  cursor: pointer;
  position: absolute;
  bottom: 40px;
  right: 0px;
  /* background: #c4c4c4; */
`;
const RecommendImgIcon = styled.img`
  width: 80%;
  height: 80%;
  object-fit: contain;
  border-radius: 10px;
`;

export default function RecommendImgPrev({ onRecommendImageUrlChange }) {
  const [imgUrl, setImgUrl] = useState("");
  const fileInputRef = useRef(null);
  // useRef를 사용하여 파일 입력(input) 요소에 대한 참조 생성
  const maxSize = 10 * 1024 * 1024;
  const handleUploadImg = () => {
    if (fileInputRef.current && fileInputRef.current.files.length > 0) {
      const file = fileInputRef.current.files[0];
      if (file.size > maxSize) {
        alert("파일 사이즈는 10MB 이하만 가능합니다");
        return;
      } else if (!/^(image\/jpeg|image\/png|image\/jpg)$/.test(file.type)) {
        alert("파일 포맷은 */jpeg,*/png,*/jpg 만 가능합니다");
        return;
      }
      const fileUrl = URL.createObjectURL(file); // 파일 객체에 대한 URL 생성
      console.log(fileUrl); // 파일 URL 출력

      const reader = new FileReader();

      reader.onload = e => {
        const imageUrl = e.target.result;
        onRecommendImageUrlChange(file, imageUrl); // imgUrl을 MakePost 컴포넌트로 전달
        setImgUrl(imageUrl);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <RecommendImgWrapper>
      <RecommendIconWrapper>
        <RecommendImgInput
          type="file"
          accept="image/jpeg,image/jpg,image/png"
          onChange={handleUploadImg}
          ref={fileInputRef}
        />
        <RecommendImgIcon src={uploadPhoto} alt="사진을 올리는 버튼 이미지" />
      </RecommendIconWrapper>
      {imgUrl ? (
        <ImgWrapper>
          <RecommendImg src={imgUrl} alt="업로드된 이미지" />
        </ImgWrapper>
      ) : (
        <EmptyBox></EmptyBox>
      )}
    </RecommendImgWrapper>
  );
}
