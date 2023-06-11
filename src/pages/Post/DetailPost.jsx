import React from "react";
import PostItem from "../../components/Post/PostItem/PostItem";
import Comment from "../../components/Comment/Comment";
import styled from "styled-components";

const WriteCommentSection = styled.div`
  display: flex;
  gap: 18px;
  padding: 12.5px 16px;
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

export default function DetailPost() {
  return (
    <div class="l-wrapper">
      <PostItem />
      <Comment />
      <WriteCommentSection class="make-replay">
        <PostUserImg
          src={require("../../assets/images/basic-profile-sm.svg").default}
          alt="사용자 이미지"
        />
        <WriteComment type="text" placeholder="댓글 입력하기" />
        <BtnDisplay class="display">게시</BtnDisplay>
      </WriteCommentSection>
    </div>
  );
}
