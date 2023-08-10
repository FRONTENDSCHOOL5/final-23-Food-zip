import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../Modal/Alert/Alert";
import Modal from "../Modal/Modal/Modal";
import {
  StyledComment,
  CommentBtnMore,
  StyledCommentUserInfo,
  CommentUserProfile,
  StyledCommentContent,
  CommentContent,
} from "./CommentStyle";
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
    <>
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
    </>
  );
}
