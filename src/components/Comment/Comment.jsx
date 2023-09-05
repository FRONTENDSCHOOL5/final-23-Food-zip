import React from "react";
import { useNavigate } from "react-router-dom";
import sprite from "../../assets/images/SpriteIcon.svg";
import {
  StyledComment,
  SocialSvg,
  StyledCommentUserInfo,
  CommentUserProfile,
  StyledCommentContent,
  CommentContent,
  MoreBtn,
} from "./CommentStyle";
import { useRecoilState } from "recoil";
import { modalState } from "../../atoms/modalAtom";
export default function Comment({ commentList, postId }) {
  const where = localStorage.getItem("accountname");
  const navigate = useNavigate();

  const SocialSVG = ({
    id,
    color = "white",
    size = 20,
    strokeColor = "#767676",
    onClick,
  }) => (
    <SocialSvg onClick={onClick}>
      <svg fill={color} width={size} height={size} stroke={strokeColor}>
        <use href={`${sprite}#${id}`} style={{ stroke: "strokeColor" }} />
      </svg>
    </SocialSvg>
  );

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

  const [modal, setModal] = useRecoilState(modalState);
  const modalOpen = (type, id) => {
    setModal({
      show: true,
      type,
      commentId: id,
      postId: postId,
    });
  };

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
            <MoreBtn>
              <SocialSVG
                id="icon-more-vertical"
                onClick={() =>
                  modalOpen(
                    where === comment.author.accountname ? "delete" : "report",
                    comment.id,
                  )
                }
              />
            </MoreBtn>
          </StyledComment>
        );
      })}
    </>
  );
}
