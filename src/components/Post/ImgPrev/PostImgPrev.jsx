import React, { useRef, useState } from "react";
import styled from "styled-components";
import uploadPhoto from "../../../assets/images/camera-btn.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

const UploadImg = styled.img`
  max-width: 90px;
  max-height: 90px;
  object-fit: contain;
  border-radius: 10px;
`;

export default function PostImgPrev({ onImageUrlChange, setImageUrls }) {
  const [imgUrl, setImgUrl] = useState([]);
  const [imgFile, setImgFile] = useState([]);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const maxSize = 10 * 1024 * 1024;
  const handleUploadImg = async () => {
    try {
      if (fileInputRef.current && fileInputRef.current.files.length > 0) {
        const files = Array.from(fileInputRef.current.files);
        console.log("Files:", files);
        console.log("Files:", files[0].size);

        const nowImgFileList = [...imgFile];
        const nowImgUrlList = [...imgUrl];

        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          if (file.size > maxSize) {
            alert("파일 사이즈는 10MB 이하만 가능합니다");
            return;
          } else if (!/^(image\/jpeg|image\/png|image\/jpg)$/.test(file.type)) {
            alert("파일 포맷은 */jpeg,*/png,*/jpg 만 가능합니다");
            return;
          }
          const fileUrl = URL.createObjectURL(file);
          nowImgFileList.push(file);
          nowImgUrlList.push(fileUrl);

          const reader = new FileReader();
          reader.onload = e => {
            const imageUrl = e.target.result;
            onImageUrlChange(nowImgFileList[i], imageUrl);
          };

          reader.readAsDataURL(file);
        }

        setImgFile(nowImgFileList);
        setImgUrl(nowImgUrlList);

        const formData = new FormData();
        files.forEach(file => {
          formData.append("image", file);
        });

        console.log("FormData:", formData);

        const uploadResponse = await axios.post(
          "https://api.mandarin.weniv.co.kr/image/uploadfiles",
          formData,
        );

        console.log("Upload Response:", uploadResponse);

        const imageUrls = uploadResponse.data.map(file => {
          const filename = file.filename;
          console.log("Filename:", filename);
          return `https://api.mandarin.weniv.co.kr/${filename}`;
        });
        setImageUrls(imageUrls);
        console.log("Image URLs:", imageUrls);
      }
    } catch (error) {
      console.error(error);
      navigate("/error");
    }
  };

  return (
    <UploadContainer>
      <UploadImgWrapper htmlFor="file-input" className="upload-img">
        <UploadImgInput
          type="file"
          id="file-input"
          multiple="multiple"
          accept="image/jpeg,image/jpg,image/png"
          onChange={handleUploadImg}
          ref={fileInputRef}
        />
        <UploadImgIcon src={uploadPhoto} alt="사진을 올리는 버튼 이미지" />
      </UploadImgWrapper>
      {imgUrl.map((url, index) => (
        <div key={index}>
          <UploadImg src={url} alt="업로드된 이미지" />
        </div>
      ))}
    </UploadContainer>
  );
}
