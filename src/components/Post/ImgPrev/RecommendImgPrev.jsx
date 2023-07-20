import React, { useRef, useState, useEffect } from "react";
import uploadPhoto from "../../../assets/images/camera-color.svg";
import imageCompression from "browser-image-compression";
import {
  RecommendIconWrapper,
  RecommendImg,
  RecommendImgIcon,
  RecommendImgInput,
  RecommendImgWrapper,
  ImgWrapper,
  EmptyBox,
} from "./RecommendImgPrevStyle";
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
      maxSizeMB: 0.7,
      maxWidthOrHeight: 700,
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
        onRecommendImageUrlChange(file, imageUrl);
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
