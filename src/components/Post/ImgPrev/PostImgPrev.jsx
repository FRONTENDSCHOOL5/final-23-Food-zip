import React, { useRef, useState } from "react";
import styled from "styled-components";
import uploadPhoto from "../../../assets/images/camera-btn.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";
import closeBtn from "../../../assets/images/close-btn.svg";

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
  width: 90px;
  height: 90px;
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
const UploadImgDiv = styled.div`
  position: relative;
`;
const UploadImg = styled.img`
  max-width: 90px;
  max-height: 90px;
  object-fit: contain;
  border-radius: 10px;
  border: 1px solid #eee;
  box-sizing: border-box;
`;
const CloseImgBtn = styled.button`
  background: url(${closeBtn}) center center / 18px 18px no-repeat;
  width: 18px;
  height: 18px;
  position: absolute;
  top: 4px;
  right: 4px;
`;
export default function PostImgPrev({ onImageUrlChange, setImageUrls }) {
  const [imgUrl, setImgUrl] = useState([]);
  const [imgFile, setImgFile] = useState([]);
  const [boardImage, setBoardImage] = useState(null);
  // 이미지 미리보기 state
  const [uploadPreview, setUploadPreview] = useState([]);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const maxSize = 10 * 1024 * 1024;

  const handleUploadImg = async e => {
    let file = e.target?.files[0];

    if (file.size > maxSize) {
      alert("파일 사이즈는 10MB 이하만 가능합니다");
      return;
    } else if (
      !/^(image\/jpeg|image\/png|image\/jpg|image\/gif)$/.test(file.type)
    ) {
      alert("파일 포맷은 */jpeg,*/png,*/jpg 만 가능합니다");
      return;
    }
    const options = {
      maxSizeMB: 0.5, // 이미지 최대 용량
      maxWidthOrHeight: 230, // 최대 넓이(혹은 높이)
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(file, options);
      setBoardImage(compressedFile);
      const promise = imageCompression.getDataUrlFromFile(compressedFile);
      promise.then(result => {
        setUploadPreview(result);
      });
      console.log("compress", compressedFile);
      // FileReader
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        const base64data = reader.result;
        const imageUrl = formDataHandler(base64data); // 이 함수는 밑에서 설명
        onImageUrlChange(file, imageUrl);
        setImgUrl(imageUrl);
      };
    } catch (error) {
      console.log(error);
    }
  };
  const formDataHandler = async dataURI => {
    const byteString = atob(dataURI.split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: "image/jpeg" });
    const file = new File([blob], "image.jpg", { type: "image/jpeg" });
    return file;
  };
  const removeImg = () => {
    setUploadPreview("");
    onImageUrlChange(null, null);
    setImgUrl("");
  };
  return (
    <UploadContainer>
      <UploadImgWrapper htmlFor="file-input">
        <UploadImgInput
          type="file"
          id="file-input"
          // multiple="multiple"
          accept="image/jpeg,image/jpg,image/png,image/gif"
          onChange={handleUploadImg}
          ref={fileInputRef}
        />
        <UploadImgIcon src={uploadPhoto} alt="사진을 올리는 버튼 이미지" />
      </UploadImgWrapper>
      {uploadPreview.length > 0 && (
        <UploadImgDiv>
          <CloseImgBtn onClick={removeImg}></CloseImgBtn>
          <UploadImg src={uploadPreview} alt="업로드된 이미지" />
        </UploadImgDiv>
      )}
      {/* {imgUrl.map((url, index) => (
        <div key={index}>
          <UploadImg src={url} alt="업로드된 이미지" />
        </div>
      ))} */}
    </UploadContainer>
  );
}
