import React, { useState } from "react";
import styled from "styled-components";
import MoreIcon from "../../assets/images/icon-more-vertical.svg";
import Alert from "../Modal/Alert";
import Modal from "../Modal/Modal";

const StyledCommentWrapper = styled.ul`
  /* max-height: 287px; */
`;
const StyledComment = styled.li`
  position: relative;
  display: flex;
  gap: 12px;
  padding: 10px 0 0;
`;
const CommentBtnMore = styled.button`
  width: 20px;
  height: 20px;
  background: url(${MoreIcon});
  position: absolute;
  top: 20px;
  right: 0;
`;

const CommentUserProfile = styled.img`
  border-radius: 50%;
  width: 36px;
  height: 36px;
`;
const StyledCommentUserInfo = styled.div`
  flex-grow: 1;
  display: flex;
  gap: 6px;
  /* margin-bottom: 16px; */
  h3 {
    font-size: 14px;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: left;
  }
  p {
    font-size: 10px;
    font-weight: 400;
    line-height: 13px;
    letter-spacing: 0em;
    display: flex;
    align-items: center;
  }
`;

const StyledCommentContent = styled.div`
  flex-grow: 1;
`;

const CommentContent = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
  margin: 10px 0;
`;

export default function Comment({ commentList, postId }) {
  const where = localStorage.getItem("accountname");
  console.log(commentList);
  const [modalShow, setModalShow] = useState(false);
  const [modalType, setModalType] = useState("delete");
  const [selectedId, setSelectedId] = useState(null);
  function modalClose(e) {
    if (e.target === e.currentTarget) {
      setModalShow(false);
    }
  }
  function modalOpen(type, id) {
    console.log("type", type);
    setModalShow(true);
    setModalType(type);
    setSelectedId(id);
  }
  console.log(commentList);
  console.log("commentId", selectedId);

  const [alertShow, setAlertShow] = useState(false);
  function alertClose(e) {
    if (e.target === e.currentTarget) {
      setAlertShow(false);
    }
  }

  function alertOpen() {
    setAlertShow(true);
  }

  return (
    <StyledCommentWrapper>
      {commentList?.map(comment => {
        return (
          <StyledComment key={comment.id}>
            <CommentUserProfile
              src={comment.author.image}
              alt="유저의 프로필"
            />
            <StyledCommentContent>
              <StyledCommentUserInfo>
                <h3>{comment.author.username}</h3>
                <p>몇분전</p>
              </StyledCommentUserInfo>
              <CommentContent>{comment.content}</CommentContent>
            </StyledCommentContent>
            <CommentBtnMore
              type="button"
              onClick={() => {
                modalOpen(
                  where === comment.author.accountname ? "delete" : "report",
                  comment.id,
                );
              }}
            ></CommentBtnMore>
          </StyledComment>
        );
      })}
      {modalShow && (
        <Modal
          type={modalType}
          modalClose={modalClose}
          alertOpen={alertOpen}
          commentId={selectedId}
          postId={postId}
        />
      )}
      {alertShow && (
        <Alert
          type="comment"
          alertClose={alertClose}
          commentId={selectedId}
          postId={postId}
        />
      )}
    </StyledCommentWrapper>
  );
}
