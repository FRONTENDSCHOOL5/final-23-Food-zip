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
  const [imgFile, setImgFile] = useState([]);
  const [imgUrl, setImgUrl] = useState([]);
  const [content, setContent] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleImageUrlChange = (file, url) => {
    setImgFile(prevFiles => [...prevFiles, file]);
    setImgUrl(prevUrls => [...prevUrls, url]);
  };

  const uploadPost = async () => {
    try {
      const formData = new FormData();
      imgFile.forEach(file => {
        formData.append("image", file);
      });

      const uploadResponse = await axios.post(
        "https://api.mandarin.weniv.co.kr/image/uploadfiles",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log(uploadResponse);
      const imageUrls = uploadResponse.data.map(file => {
        const filename = file.filename;
        console.log(filename);
        return `https://api.mandarin.weniv.co.kr/${filename}`;
      });
      const joinedUrls = imageUrls.join(",");
      console.log(joinedUrls);
      const postResponse = await axios.post(
        "https://api.mandarin.weniv.co.kr/post",
        {
          post: {
            content: content,
            image: joinedUrls,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      console.log("이봐", postResponse);
      navigate("/myprofile");
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpload = () => {
    uploadPost();
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
