import styled from "styled-components";
import MoreIcon from "../../assets/images/icon-more-vertical.svg";

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
export {
  StyledComment,
  CommentBtnMore,
  StyledCommentUserInfo,
  CommentUserProfile,
  StyledCommentContent,
  CommentContent,
};
