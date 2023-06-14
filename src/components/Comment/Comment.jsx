import React from "react";
import styled from "styled-components";
import MoreIcon from "../../assets/images/icon-more-vertical.svg";
const StyledCommentWrapper = styled.section``;
const StyledComment = styled.div`
  position: relative;
  display: flex;
  gap: 12px;
  padding: 20px 0 16px 0;
`;
const CommentBtnMore = styled.button`
  width: 18px;
  height: 18px;
  background: url(${MoreIcon});
  position: absolute;
  top: 20px;
  right: 16px;
`;

const CommentUserProfile = styled.img`
  margin-top: -45px;
`;
const StyledCommentUserInfo = styled.div`
  flex-grow: 1;
  display: flex;
  gap: 6px;
  margin-bottom: 16px;
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

// .user-info-replay,
// .show-more-replay {
//   margin-top: -40px;
// }

//
const StyledCommentContent = styled.div`
  flex-grow: 1;
`;

const CommentContent = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
  margin: 16px 0;
`;

export default function Comment({ modalOpen }) {
  return (
    <>
      <StyledCommentWrapper className="comment-section">
        <StyledComment className="comment">
          <CommentUserProfile
            className="user-info-comment"
            src={require("../../assets/images/basic-profile-sm.svg").default}
            alt="유저의 프로필"
          />
          <StyledCommentContent className="comment-main">
            <StyledCommentUserInfo className="comment-user-info">
              <h3>서귀포시 무슨 농장</h3>
              <p>몇분전</p>
            </StyledCommentUserInfo>
            <CommentContent className="comment-content">
              게시들 답글~~!! 최고최고
            </CommentContent>
          </StyledCommentContent>
          <CommentBtnMore type="button" onClick={modalOpen}></CommentBtnMore>
        </StyledComment>
      </StyledCommentWrapper>
    </>
  );
}
