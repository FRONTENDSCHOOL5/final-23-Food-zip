import React, { useRef, useState } from "react";
import styled from "styled-components";
import uploadPhoto from "../../../assets/images/camera-btn.svg";

const UploadContainer = styled.div`
  width: 100%;
  padding: 20px 16px;
  overflow: auto;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  border-bottom: 1px solid #c4c4c4;
`;

const UploadImgWrapper = styled.label`
  display: inline-block;
  width: 90px; /* 변경된 너비 */
  height: 90px; /* 변경된 높이 */
  flex-shrink: 0;
  cursor: pointer;
  margin-right: 10px;
`;

const UploadImgInput = styled.input`
  display: none;
`;
const UploadImgIcon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;
const UploadImg = styled.img`
  max-width: 90px;
  max-height: 90px;
  object-fit: contain;
  border-radius: 10px;
`;
export default function PostImgPrev({ onImageUrlChange }) {
  const [imgUrl, setImgUrl] = useState("");
  const fileInputRef = useRef(null);

  const handleUploadImg = () => {
    if (fileInputRef.current && fileInputRef.current.files.length > 0) {
      const file = fileInputRef.current.files[0];
      const fileUrl = URL.createObjectURL(file); // 파일 객체에 대한 URL 생성
      console.log(fileUrl); // 파일 URL 출력

      const reader = new FileReader();

      reader.onload = e => {
        const imageUrl = e.target.result;
        onImageUrlChange(file, imageUrl); // imgUrl을 MakePost 컴포넌트로 전달
        setImgUrl(imageUrl);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <UploadContainer>
      <UploadImgWrapper htmlFor="file-input" className="upload-img">
        <UploadImgInput
          type="file"
          id="file-input"
          accept="image/jpeg,image/jpg,image/png"
          onChange={handleUploadImg}
          ref={fileInputRef}
        />
        <UploadImgIcon src={uploadPhoto} alt="사진을 올리는 버튼 이미지" />
      </UploadImgWrapper>
      {imgUrl && (
        <div>
          <UploadImg src={imgUrl} alt="업로드된 이미지" />
        </div>
      )}
    </UploadContainer>
  );
}
