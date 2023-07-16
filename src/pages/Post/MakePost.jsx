import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PostImgPrev from "../../components/Post/ImgPrev/PostImgPrev";
import Header from "../../components/common/Header/Header";
import { useNavigate } from "react-router-dom";
import { imgUpload } from "../../api/imgUpload";
import { postUploadApi } from "../../api/post";

const StyledContainer = styled.section`
  width: 100%;
  height: calc(100vh - 48px);
  padding-top: 48px;
  overflow: hidden;
  background: #fff;
`;

const StyledPost = styled.textarea`
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: none;
  font-size: 15px;
  font-family: "SUIT-Regular";
  resize: none;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #c0c0c0;
  }
`;

export default function MakePost() {
  const [imgFile, setImgFile] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  // const [imageUrls, setImageUrls] = useState("");
  const [content, setContent] = useState("");
  const [isValid, setIsValid] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleImageUrlChange = (file, url) => {
    setImgFile(file);
    setImgUrl(url);
  };
  const uploadPost = async content => {
    try {
      const formData = new FormData();
      formData.append("image", imgFile);
      const uploadResponse = await imgUpload(formData);
      let imageUrl = "";
      if (uploadResponse.data.filename) {
        imageUrl =
          "https://api.mandarin.weniv.co.kr/" + uploadResponse.data.filename;
      }
      await postUploadApi(content, imageUrl, token);
      navigate("/myprofile");
    } catch (error) {
      console.error(error);
      navigate("/error");
    }
  };
  const handleUpload = () => {
    if (isValid) {
      uploadPost(content);
    } else {
      alert("게시글이 작성되지 않았습니다.");
    }
  };
  const checkContent = () => {
    if (!content || content.trim().length === 0) {
      if (imgUrl) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    } else {
      setIsValid(true);
    }
  };

  useEffect(() => {
    checkContent();
  }, [content, imgUrl]);

  const onChangeInput = event => {
    setContent(event.target.value);
    checkContent();
  };
  return (
    <>
      <h1 className="a11y-hidden">게시물 작성 페이지</h1>
      <Header
        type="upload"
        handleUploadBtn={isValid}
        uploadHandler={handleUpload}
      />
      <StyledContainer>
        <PostImgPrev onImageUrlChange={handleImageUrlChange} />
        <form>
          <StyledPost
            rows="28"
            placeholder="게시글 입력하기"
            value={content}
            onChange={onChangeInput}
          ></StyledPost>
        </form>
      </StyledContainer>
    </>
  );
}
