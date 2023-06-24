import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../common/Header/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import IconArrowLeft from "../../../assets/images/icon-arrow-left.svg";
import Button from "../../common/Button/Button";
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const EditContainer = styled.form``;
const HeaderLayoutDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  border-bottom: 1px solid #dbdbdb;
  box-sizing: border-box;
  margin-bottom: 20px;
  background-color: white;
`;
const HeaderLeftBtn = styled.button`
  border: 0;
  padding: 10px;
  padding-left: 0;
  background-color: transparent;
`;
const ModalContent = styled.div`
  background-color: #fff;
  padding: 0 20px 20px 20px;
  border-radius: 5px;
`;
const PostImage = styled.img`
  width: 400px;
  border-radius: 10px;
`;
const PostContent = styled.textarea`
  box-sizing: border-box;
  font-size: 20px;
  font-family: "SUIT-Regular";
  padding-left: 10px;
  border: none;
  resize: none;
  &:focus {
    outline: none;
  }
`;
export default function PostEdit({ closeModal, postId, Info }) {
  console.log("edit", postId);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [postInfo, setPostInfo] = useState({});

  useEffect(() => {
    // 컴포넌트가 마운트될 때 게시물 정보 가져오기
    fetchPostInfo();
  }, []);

  const fetchPostInfo = async () => {
    try {
      const response = await axios.get(
        `https://api.mandarin.weniv.co.kr/post/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const post = response.data.post;
      setPostInfo(post);
      console.log("게시글 정보", post);
    } catch (error) {
      console.error(error);
      navigate("/error");
    }
  };

  const postEditUpload = async event => {
    // event.preventDefault();

    console.log("게시물 아이디", postId);
    console.log("게시물정보", Info);
    try {
      const res = await axios.put(
        `https://api.mandarin.weniv.co.kr/post/${postId}`,
        {
          post: {
            content: event.content,
            image: event.image,
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
      console.log("새 게시물", postInfo);
      closeModal();
    } catch (error) {
      console.error(error);
      navigate("/error");
      return false;
    }
  };

  console.log(postInfo.author);
  function handleUpload() {
    postEditUpload(postInfo.image, postInfo.content);
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
              // onClick={closeModal}
            ></Button>
          </HeaderLayoutDiv>
          <PostImage src={postInfo.image} alt="게시물 사진" />
          <PostContent
            rows="10"
            value={postInfo.content}
            onChange={e =>
              setPostInfo({ ...postInfo, content: e.target.value })
            }
          />
        </EditContainer>
      </ModalContent>
    </ModalOverlay>
  );
}
