import styled from "styled-components";

const StyledComment = styled.li`
  position: relative;
  display: flex;
  gap: 12px;
  padding: 10px 0 0;
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
  max-width: 290px;
`;
const SocialSvg = styled.div`
  height: 20px;
  margin-top: 5px;
`;
const MoreBtn = styled.button`
  width: 20px;
  height: 20px;
`;
export {
  StyledComment,
  StyledCommentUserInfo,
  CommentUserProfile,
  StyledCommentContent,
  CommentContent,
  SocialSvg,
  MoreBtn,
};
