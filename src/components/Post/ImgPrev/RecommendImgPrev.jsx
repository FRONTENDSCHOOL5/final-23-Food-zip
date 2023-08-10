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
  console.log(initialImage);
  const handleUploadImg = async e => {
    let file = e.target?.files[0];
    console.log("pre1", file);
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

      const result = await imageCompression.getDataUrlFromFile(compressedFile);
      setUploadPreview(result);

      onRecommendImageUrlChange(compressedFile, result);
    } catch (error) {
      console.log(error);
    }
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
