import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";
import Button from "../../common/Button/Button";
import {
  ModalContent,
  ModalOverlay,
  HeaderLayoutDiv,
  HeaderLeftBtn,
  PostContent,
  EditContainer,
  EditImgWrapper,
  ImgStyle,
} from "./PostEditStyle";
import {
  UploadContainer,
  UploadImg,
  UploadImgDiv,
  UploadImgIcon,
  UploadImgInput,
  UploadImgWrapper,
  CloseImgBtn,
} from "../ImgPrev/PostEditPrevStyle";
import { postEditApi, postInfoApi } from "../../../api/post";
import { imgUpload } from "../../../api/imgUpload";
import sprite from "../../../assets/images/SpriteIcon.svg";

export default function PostEdit({ closeModal, postId }) {
  const SocialSVG = ({ id, color = "white", size = 24, onClick }) => (
    <div onClick={onClick}>
      <svg fill={color} width={size} height={size}>
        <use href={`${sprite}#${id}`} />
      </svg>
    </div>
  );
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [postInfo, setPostInfo] = useState({});
  const [splitResult, setSplitResult] = useState([]);

  const [imgUrl, setImgUrl] = useState([]);
  const [boardImage, setBoardImage] = useState(null);
  const [uploadPreview, setUploadPreview] = useState([]);
  const dragItem = useRef(); // 드래그할 아이템의 인덱스
  const dragOverItem = useRef();
  const fileInputRef = useRef(null);
  const maxSize = 10 * 1024 * 1024;

  useEffect(() => {
    fetchPostInfo();
  }, []);

  useEffect(() => {
    setUploadPreview(splitResult);
  }, [splitResult]);
  console.log("prev", splitResult, uploadPreview);

  const handleUploadImg = async e => {
    if (!e.target?.files) {
      return;
    }

    const fileList = Array.from(e.target.files);
    console.log("check", e.target.files);
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
    setImgUrl(prevImgUrl => [...prevImgUrl, ...uploadedFileUrls]);
    console.log("!!!", imgUrl);
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
    console.log("remove", index, imgUrl, uploadPreview);
    const updatedUploadPreview = uploadPreview.filter(
      (_imageData, currentIndex) => currentIndex !== index,
    );
    const updatedImageUrls = imgUrl.filter(
      (_imageUrl, currentIndex) => currentIndex !== index,
    );
    console.log(updatedUploadPreview, updatedImageUrls);
    setUploadPreview(updatedUploadPreview);
    setImgUrl(updatedImageUrls);
  };

  const fetchPostInfo = async () => {
    try {
      await postInfoApi(postId, token).then(res => {
        const post = res.data.post;
        setPostInfo(post);
        if (typeof post.image === "string") {
          const splitImages = post.image.split(",").map(image => image.trim());
          setSplitResult(splitImages); //기존 게시물
        } else {
          console.error("post.image is not a string");
        }
      });
    } catch (error) {
      console.error(error);
      navigate("/error");
    }
  };

  const postEditUpload = async () => {
    try {
      const newSplitResult = [...splitResult]; // Create a shallow copy of splitResult
      if (imgUrl) {
        console.log("here");
        const uploadedImageUrls = [];
        for (const image of imgUrl) {
          const formData = new FormData();
          formData.append("image", image);
          const uploadResponse = await imgUpload(formData);
          console.log("upload", uploadResponse);
          let imageUrl = "";
          if (uploadResponse.data.filename) {
            imageUrl =
              "https://api.mandarin.weniv.co.kr/" +
              uploadResponse.data.filename;
          }
          uploadedImageUrls.push(imageUrl);
          console.log("new", uploadedImageUrls);
          newSplitResult.push(imageUrl); // Update the newSplitResult array directly
          console.log("if", newSplitResult.join(", "));
        }
      }
      console.log("img", newSplitResult);
      setSplitResult(newSplitResult); // Update the state once after the loop is finished

      const res = await postEditApi(
        postId,
        token,
        postInfo.content,
        newSplitResult.join(", "),
      );
      const updatedPost = res.data.post;
      console.log("update", updatedPost);
      setPostInfo(updatedPost);
      closeModal();
    } catch (error) {
      console.error(error);
      navigate("/error");
      return false;
    }
  };
  function handleUpload() {
    postEditUpload();
  }

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
  const drop = e => {
    const newList = [...splitResult];
    const dragItemValue = newList[dragItem.current];
    newList.splice(dragItem.current, 1);
    newList.splice(dragOverItem.current, 0, dragItemValue);
    dragItem.current = null;
    dragOverItem.current = null;
    setSplitResult(newList);
  };
  return (
    <ModalOverlay onClick={closeModal}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <EditContainer>
          <HeaderLayoutDiv>
            <HeaderLeftBtn type="button">
              <SocialSVG id="icon-arrow-left" onClick={closeModal} />
            </HeaderLeftBtn>
            <Button
              type="submit"
              content="저장"
              size="ms"
              width="ms"
              bgColor="active"
              onClick={handleUpload}
            ></Button>
          </HeaderLayoutDiv>
          <EditImgWrapper>
            {/* <UploadContainer> */}
            <UploadImgWrapper htmlFor="file-input">
              <UploadImgInput
                type="file"
                id="file-input"
                accept="image/jpeg,image/jpg,image/png,image/gif"
                multiple
                onChange={handleUploadImg}
                ref={fileInputRef}
              />
              <SocialSVG id="camera-btn" size="90" />
            </UploadImgWrapper>
            {uploadPreview?.map((preview, index) => (
              <UploadImgDiv key={index}>
                <CloseImgBtn
                  onClick={event => {
                    event.preventDefault(); // 기본 동작 취소
                    if (index < splitResult.length) {
                      const new_splitResult = splitResult.filter(
                        (_, idx) => idx !== index,
                      );
                      setSplitResult(new_splitResult);
                    } else {
                      const uploadIndex = index - splitResult.length;
                      removeImg(uploadIndex);
                    }
                  }}
                ></CloseImgBtn>
                <UploadImg
                  draggable={false}
                  onDragStart={e => dragStart(e, index)}
                  onDragEnter={e => dragEnter(e, index)}
                  onDragEnd={drop}
                  onDragOver={e => e.preventDefault()}
                  ket={index}
                  src={preview}
                  alt="업로드된 이미지"
                />
              </UploadImgDiv>
            ))}
            {/* </UploadContainer> */}
          </EditImgWrapper>
          <PostContent
            rows="10"
            columns="60"
            value={postInfo.content}
            hasImage={postInfo.image !== ""}
            onChange={e =>
              setPostInfo({ ...postInfo, content: e.target.value })
            }
          />
        </EditContainer>
      </ModalContent>
    </ModalOverlay>
  );
}
