import React, { useState } from "react";
import PostItem from "../../components/Post/PostItem/PostItem";
import Comment from "../../components/Comment/Comment";
import styled from "styled-components";
import Header from "../../components/common/Header/Header";
import Modal from "../../components/Modal/Modal";
const DetailPostWrapper = styled.div`
  background: #fff;
  width: 100%;
  height: calc(100vh - 48px);
  padding: 68px 0 0 0;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;
const PostItemSection = styled.div`
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
`;
const WriteCommentSection = styled.div`
  display: flex;
  gap: 18px;
  padding: 12.5px 16px;
  justify-content: baseline;
`;

const WriteComment = styled.input`
  border: none;
  flex-grow: 1;
`;

const BtnDisplay = styled.button`
  color: #c4c4c4;
`;

const PostUserImg = styled.img`
  width: 30px;
  height: 30px;
`;
const CommentSection = styled.div`
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  border-top: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
  flex-grow: 1;
  flex-shrink: 0;
`;

export default function DetailPost() {
  const [modalShow, setModalShow] = useState(false);
  function modalClose(e) {
    if (e.target === e.currentTarget) {
      setModalShow(false);
    }
  }

  function modalOpen() {
    setModalShow(true);
  }
  return (
    <>
      <Header type="profile" active={true} />
      <DetailPostWrapper class="l-wrapper">
        <PostItemSection>
          <PostItem />
        </PostItemSection>
        <CommentSection>
          <Comment modalOpen={modalOpen} />
        </CommentSection>
        <WriteCommentSection class="make-replay">
          <PostUserImg
            src={require("../../assets/images/basic-profile-sm.svg").default}
            alt="사용자 이미지"
          />
          <WriteComment type="text" placeholder="댓글 입력하기" />
          <BtnDisplay class="display">게시</BtnDisplay>
        </WriteCommentSection>
      </DetailPostWrapper>
      {modalShow && <Modal type="report" modalClose={modalClose} />}
    </>
  );
}
