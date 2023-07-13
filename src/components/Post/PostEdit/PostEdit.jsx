import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import IconArrowLeft from "../../../assets/images/icon-arrow-left.svg";
import Button from "../../common/Button/Button";
import RecommendImgPrev from "../ImgPrev/RecommendImgPrev";
import {
  ModalContent,
  ModalOverlay,
  HeaderLayoutDiv,
  HeaderLeftBtn,
  PostContent,
  EditContainer,
} from "./PostEditStyle";
export default function PostEdit({ closeModal, postId }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [postInfo, setPostInfo] = useState({});

  useEffect(() => {
    fetchPostInfo();
  }, []);

  const fetchPostInfo = async () => {
    try {
      const response = await axios.get(
        `https://api.mandarin.weniv.co.kr/post/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        },
      );
      const post = response.data.post;
      setPostInfo(post);
    } catch (error) {
      console.error(error);
      navigate("/error");
    }
  };

  const postEditUpload = async () => {
    try {
      let imageUrl = "";
      if (postInfo.image) {
        const file = await convertBase64ToBlob(postInfo.image);
        const formData = new FormData();
        formData.append("image", file);

        const uploadResponse = await axios.post(
          "https://api.mandarin.weniv.co.kr/image/uploadfile",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
        if (uploadResponse.data.filename) {
          imageUrl =
            "https://api.mandarin.weniv.co.kr/" + uploadResponse.data.filename;
        }
      }
      const res = await axios.put(
        `https://api.mandarin.weniv.co.kr/post/${postId}`,
        {
          post: {
            content: postInfo.content,
            image: imageUrl,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        },
      );

      const updatedPost = res.data.post;
      setPostInfo(updatedPost);
      closeModal();
    } catch (error) {
      console.error(error);
      navigate("/error");
      return false;
    }
  };
  const convertBase64ToBlob = async base64Data => {
    const response = await fetch(base64Data);
    const blob = await response.blob();
    return new File([blob], "image.jpg", { type: "image/jpeg" });
  };
  function handleUpload() {
    postEditUpload();
  }
  return (
    <ModalOverlay onClick={closeModal}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <EditContainer>
          <HeaderLayoutDiv>
            <HeaderLeftBtn type="button">
              <img
                src={IconArrowLeft}
                alt="뒤로가기 아이콘"
                onClick={closeModal}
              />
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
          <RecommendImgPrev
            onRecommendImageUrlChange={(file, imageUrl) =>
              setPostInfo({ ...postInfo, image: imageUrl })
            }
            hasImage={postInfo.image !== ""}
            initialImage={postInfo.image}
            iconStyle={`width: 65%; height: 65%;`}
            wrapperStyle={`bottom: 43px; right: -12px;`}
          />
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
