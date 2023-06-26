import React from "react";
import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import uploadPhoto from "../../../assets/images/camera-color.svg";
import imgbg from "../../../assets/images/img-bg.svg";
import imageCompression from "browser-image-compression";

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
  margin-top: 5px;
  width: 100%;
  height: 204px;
  border-radius: 10px;
  background: url(${imgbg});
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
const defaultIconPosition = `
  bottom: 40px;
  right: 0px;
`;
const RecommendIconWrapper = styled.label`
  display: inline-block;
  cursor: pointer;
  position: absolute;
  ${props => props.wrapperStyle || defaultIconPosition}
`;
const defaultIconStyle = `
  width: 80%;
  height: 80%;
`;
const RecommendImgIcon = styled.img`
  object-fit: contain;
  border-radius: 10px;
  ${props => props.iconStyle || defaultIconStyle}
`;

export default function RecommendImgPrev({
  onRecommendImageUrlChange,
  hasImage,
  initialImage,
  iconStyle,
  wrapperStyle,
}) {
  const [imgUrl, setImgUrl] = useState("");
  const fileInputRef = useRef(null);
  const [boardImage, setBoardImage] = useState(null);
  const [uploadPreview, setUploadPreview] = useState([]);
  // useRef를 사용하여 파일 입력(input) 요소에 대한 참조 생성
  const maxSize = 10 * 1024 * 1024;
  useEffect(() => {
    if (hasImage && initialImage) {
      setUploadPreview(initialImage);
    }
  }, [hasImage, initialImage]);
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
      maxSizeMB: 0.3, // 이미지 최대 용량
      maxWidthOrHeight: 700, // 최대 넓이(혹은 높이)
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
        onRecommendImageUrlChange(file, base64data);
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

  return (
    <RecommendImgWrapper>
      <RecommendIconWrapper wrapperStyle={wrapperStyle}>
        <RecommendImgInput
          type="file"
          accept="image/jpeg,image/jpg,image/png"
          onChange={handleUploadImg}
          ref={fileInputRef}
        />
        <RecommendImgIcon
          src={uploadPhoto}
          iconStyle={iconStyle}
          alt="사진을 올리는 버튼 이미지"
        />
      </RecommendIconWrapper>
      {uploadPreview.length > 0 ? (
        <ImgWrapper>
          <RecommendImg src={uploadPreview} alt="업로드된 이미지" />
        </ImgWrapper>
      ) : (
        <EmptyBox></EmptyBox>
      )}
    </RecommendImgWrapper>
  );
}
