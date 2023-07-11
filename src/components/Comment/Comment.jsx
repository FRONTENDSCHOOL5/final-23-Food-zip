import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MoreIcon from "../../assets/images/icon-more-vertical.svg";
import Alert from "../Modal/Alert/Alert";
import Modal from "../Modal/Modal/Modal";

const StyledCommentWrapper = styled.ul`
  display: flex;
  flex-direction: column-reverse;
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
  object-fit: cover;
  cursor: pointer;
`;
const StyledCommentUserInfo = styled.div`
  flex-grow: 1;
  display: flex;
  gap: 6px;
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
  word-break: break-all;
  width: 290px;
`;

export default function Comment({ commentList, postId }) {
  const where = localStorage.getItem("accountname");
  const [modalShow, setModalShow] = useState(false);
  const [modalType, setModalType] = useState("delete");
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  const elapsedTime = commentDate => {
    const now = new Date();
    const commentTime = new Date(commentDate);
    const elapsedSeconds = Math.floor((now - commentTime) / 1000);

    const times = [
      { name: "년", seconds: 60 * 60 * 24 * 365 },
      { name: "개월", seconds: 60 * 60 * 24 * 30 },
      { name: "일", seconds: 60 * 60 * 24 },
      { name: "시간", seconds: 60 * 60 },
      { name: "분", seconds: 60 },
    ];

    for (const value of times) {
      const elapsed = Math.floor(elapsedSeconds / value.seconds);

      if (elapsed > 0) {
        return `${elapsed}${value.name} 전`;
      }
    }
    return "방금 전";
  };

  function moveProfile(accountname) {
    if (accountname === where) {
      navigate("/myprofile");
    } else {
      navigate(`/profile/${accountname}`, {
        state: {
          accountname: accountname,
        },
      });
    }
  }

  function modalClose(e) {
    if (e.target === e.currentTarget) {
      setModalShow(false);
    }
  }

  function modalOpen(type, id) {
    setModalShow(true);
    setModalType(type);
    setSelectedId(id);
  }

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
              onClick={() => {
                moveProfile(comment.author.accountname);
              }}
            />
            <StyledCommentContent>
              <StyledCommentUserInfo>
                <h3>{comment.author.username}</h3>
                <p>{elapsedTime(comment.createdAt)}</p>
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
