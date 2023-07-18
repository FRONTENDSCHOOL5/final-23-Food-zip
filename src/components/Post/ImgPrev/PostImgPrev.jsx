import React, { useRef, useState } from "react";
import imageCompression from "browser-image-compression";
import uploadPhoto from "../../../assets/images/camera-btn.svg";
import {
  UploadContainer,
  UploadImg,
  UploadImgDiv,
  UploadImgIcon,
  UploadImgInput,
  UploadImgWrapper,
  CloseImgBtn,
} from "./PostImgPrevStyle";

export default function PostImgPrev({ onImageUrlChange }) {
  const [imgUrl, setImgUrl] = useState([]);
  const [boardImage, setBoardImage] = useState(null);
  const [uploadPreview, setUploadPreview] = useState([]);

  const fileInputRef = useRef(null);
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
      maxSizeMB: 0.7,
      maxWidthOrHeight: 1000,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(file, options);
      setBoardImage(compressedFile);
      const promise = imageCompression.getDataUrlFromFile(compressedFile);
      promise.then(result => {
        setUploadPreview(result);
      });
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = async () => {
        const base64data = reader.result;
        const imageUrl = await formDataHandler(base64data);
        console.log("File object in MakePost:", file);
        onImageUrlChange(file, imageUrl);
        setImgUrl(imageUrl);
      };
    } catch (error) {
      console.log(error);
    }
  };
  // 9496 5612
  const formDataHandler = async dataURI => {
    const byteString = atob(dataURI.split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: "image/jpeg" });
    const file = new File([blob], "image.jpg", { type: "image/jpeg" });
    console.log("File object:", file); // 이 부분을 추가합니다.
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
    </UploadContainer>
  );
}
