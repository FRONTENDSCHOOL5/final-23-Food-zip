import React, { useRef, useState } from "react";
import imageCompression from "browser-image-compression";
import {
  UploadContainer,
  UploadImg,
  UploadImgDiv,
  UploadImgInput,
  UploadImgWrapper,
  CloseImgBtn,
} from "./PostImgPrevStyle";
import sprite from "../../../assets/images/SpriteIcon.svg";

export default function PostImgPrev({ onImageUrlChange }) {
  const SocialSVG = ({ id, color = "white", size = 90 }) => (
    <svg fill={color} width={size} height={size}>
      <use href={`${sprite}#${id}`} />
    </svg>
  );
  const [imgUrl, setImgUrl] = useState([]);
  const [imgFile, setImgFile] = useState([]);
  const [uploadPreview, setUploadPreview] = useState([]);
  const dragItem = useRef(); // 드래그할 아이템의 인덱스
  const dragOverItem = useRef();
  const fileInputRef = useRef(null);
  const maxSize = 10 * 1024 * 1024;
  console.log("maek", uploadPreview);
  const handleUploadImg = async e => {
    if (!e.target?.files) {
      return;
    }

    const fileList = Array.from(e.target.files);

    // 이미 업로드된 이미지와 선택된 이미지의 합이 3개를 초과할 경우 주의 메시지를 표시합니다
    if (uploadPreview.length + fileList.length > 3) {
      alert("최대 3개의 이미지만 업로드 가능합니다.");
      return;
    }

    const uploadedFileObjects = [];
    const uploadedFileUrls = [];
    const imageUploadPromises = [];

    const processFile = async file => {
      // 파일 크기 및 형식 확인
      if (file.size > maxSize) {
        alert("파일 사이즈는 10MB 이하만 가능합니다");
        return;
      } else if (
        !/^(image\/jpeg|image\/png|image\/jpg|image\/gif)$/.test(file.type)
      ) {
        alert("파일 포맷은 */jpeg,*/png,*/jpg만 가능합니다");
        return;
      }

      // 이미지 압축
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 700,
        useWebWorker: true,
      };

      try {
        const compressedFile = await imageCompression(file, options);
        uploadedFileObjects.push(compressedFile);

        // 미리보기 업데이트
        const promise = imageCompression.getDataUrlFromFile(compressedFile);
        promise.then(result => {
          setUploadPreview(prevUploadPreview => [...prevUploadPreview, result]);
        });

        // 이미지를 base64로 변환
        const reader = new FileReader();
        imageUploadPromises.push(
          new Promise(resolve => {
            reader.readAsDataURL(compressedFile);
            reader.onloadend = async () => {
              const base64data = reader.result;
              const imageUrl = await formDataHandler(base64data);
              uploadedFileUrls.push(imageUrl);
              console.log("check", uploadedFileUrls);
              resolve();
            };
          }),
        );
      } catch (error) {
        console.log(error);
      }
    };

    for (const file of fileList) {
      await processFile(file);
    }

    // 모든 이미지 업로드가 완료된 후
    await Promise.all(imageUploadPromises);
    onImageUrlChange(uploadedFileObjects, uploadedFileUrls);
    setImgUrl(prevImgUrl => [...prevImgUrl, ...uploadedFileUrls]);
    setImgFile(prevImgFile => [...prevImgFile, ...uploadedFileObjects]);
    console.log("!!!", uploadedFileObjects, uploadedFileUrls);
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
    console.log("File object:", file); // 이 부분을 추가합니다.
    return file;
  };
  const removeImg = index => {
    console.log("remove", index, imgUrl, uploadPreview, onImageUrlChange);
    const updatedUploadPreview = uploadPreview.filter(
      (_imageData, currentIndex) => currentIndex !== index,
    );
    const updatedImageUrls = imgUrl.filter(
      (_imageUrl, currentIndex) => currentIndex !== index,
    );
    console.log(updatedUploadPreview, updatedImageUrls);
    setUploadPreview(updatedUploadPreview);
    onImageUrlChange(null, updatedImageUrls);
    setImgUrl(updatedImageUrls);
  };
  console.log("이미지", imgUrl);
  const dragStart = (e, position) => {
    dragItem.current = position;
    console.log(e.target.innerHTML);
  };

  // 드래그중인 대상이 위로 포개졌을 때
  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    console.log(e.target.innerHTML);
  };

  // 드랍 (커서 뗐을 때)
  //uploadedFileObjects, uploadedFileUrls
  const drop = e => {
    const newPreviewList = [...uploadPreview];
    const newFileList = [...imgFile]; // imgUrl 리스트도 변경되야 해서 복사합니다.
    const newUrlList = [...imgUrl]; // imgUrl 리스트도 변경되야 해서 복사합니다.

    const dragItemValue = newPreviewList[dragItem.current];
    newPreviewList.splice(dragItem.current, 1);
    newPreviewList.splice(dragOverItem.current, 0, dragItemValue);

    // imgUrl 순서도 바꿔줍니다.
    const dragItemUrl = newUrlList[dragItem.current];
    newUrlList.splice(dragItem.current, 1);
    newUrlList.splice(dragOverItem.current, 0, dragItemUrl);

    const dragItemFile = newFileList[dragItem.current];
    newFileList.splice(dragItem.current, 1);
    newFileList.splice(dragOverItem.current, 0, dragItemFile);

    dragItem.current = null;
    dragOverItem.current = null;

    setUploadPreview(newPreviewList); // 변경된 순서의 imgUrl을 설정합니다.
    console.log("드래그", imgFile, imgUrl);
    onImageUrlChange(newFileList, newUrlList); // 변경된 순서로 onImageUrlChange를 호출해 적용합니다.
  };

  return (
    <UploadContainer>
      <UploadImgWrapper htmlFor="file-input">
        <UploadImgInput
          type="file"
          id="file-input"
          accept="image/jpeg,image/jpg,image/png,image/gif"
          multiple
          onChange={handleUploadImg}
          ref={fileInputRef}
        />
        <SocialSVG id="camera-btn" />
      </UploadImgWrapper>
      {uploadPreview?.map((preview, index) => (
        <UploadImgDiv key={index}>
          <CloseImgBtn
            onClick={event => {
              removeImg(index);
            }}
          ></CloseImgBtn>
          <UploadImg
            draggable
            onDragStart={e => dragStart(e, index)}
            onDragEnter={e => dragEnter(e, index)}
            onDragEnd={drop}
            onDragOver={e => e.preventDefault()}
            key={index}
            src={preview}
            alt="업로드된 이미지"
          />
        </UploadImgDiv>
      ))}
    </UploadContainer>
  );
}
