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
  width: 195px; /* 변경된 너비 */
  height: 145px; /* 변경된 높이 */
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
  max-width: 195px;
  max-height: 145px;
  object-fit: contain;
  border-radius: 10px;
`;
export default function ImgPrev() {
  const [imgUrl, setImgUrl] = useState("");
  const fileInputRef = useRef(null);

  const handleUploadImg = () => {
    const file = fileInputRef.current.files[0];
    const fileUrl = URL.createObjectURL(file);
    console.log(fileUrl);

    const reader = new FileReader();

    reader.onload = e => {
      setImgUrl(e.target.result);
    };

    if (file) {
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
