import React, { useRef, useState } from "react";
import styled from "styled-components";
import PostImgPrev from "../../components/Post/ImgPrev/PostImgPrev";
import Header from "../../components/common/Header/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StyledContainer = styled.div`
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
  font-size: 22px;
  font-family: "SUIT-Regular";
  resize: none;
  &:focus {
    outline: none;
  }
`;

export default function MakePost() {
  const [imgFile, setImgFile] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [content, setContent] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleImageUrlChange = (file, url) => {
    setImgFile(file);
    // const fileUrl = URL.createObjectURL(file);
    setImgUrl(url);
  };
  console.log(imgFile);
  const uploadPost = async (url, content) => {
    try {
      const formData = new FormData();
      formData.append("image", imgFile);
      const uploadResponse = await axios.post(
        "https://api.mandarin.weniv.co.kr/image/uploadfile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log("1 : " + uploadResponse.data);
      const imageUrl =
        "https://api.mandarin.weniv.co.kr/" + uploadResponse.data.filename;

      const postResponse = await axios.post(
        "https://api.mandarin.weniv.co.kr/post",
        {
          post: {
            content: content,
            image: imageUrl,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      console.log(postResponse);
      navigate("/myprofile");
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpload = () => {
    uploadPost(imgUrl, content);
  };

  const onChangeInput = event => {
    setContent(event.target.value);
  };

  return (
    <div>
      <Header type="upload" active={true} uploadHandler={handleUpload} />
      <StyledContainer className="post-wrapper">
        <PostImgPrev onImageUrlChange={handleImageUrlChange} />
        <form className="post-section">
          <StyledPost
            rows="28"
            className="input-content"
            placeholder="게시글 입력하기"
            value={content}
            onChange={onChangeInput}
          ></StyledPost>
        </form>
      </StyledContainer>
    </div>
  );
}
