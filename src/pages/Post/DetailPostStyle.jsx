import styled from "styled-components";

const DetailPostWrapper = styled.section`
  width: 100%;
  height: 100vh;
  /* margin-top: 48px; */
  padding: 68px 0 0px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;
const PostItemSection = styled.section`
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
`;
const WriteCommentSection = styled.section`
  position: fixed;
  bottom: 0;
  display: flex;
  gap: 18px;
  padding: 12.5px 16px;
  justify-content: baseline;
  background-color: #fff;
  width: 100%;
  max-width: 390px;
  box-sizing: border-box;
  border-top: 1px solid #dbdbdb;
`;

const WriteComment = styled.input`
  border: none;
  flex-grow: 1;
`;

const BtnDisplay = styled.button`
  color: ${({ hasText }) => (hasText ? "#286140" : "#C4C4C4")};
`;

const PostUserImg = styled.img`
  width: 36px;
  height: 36px;
  object-fit: cover;
  border-radius: 50%;
`;
const CommentSection = styled.section`
  width: 100%;
  padding: 5px 20px 65px;
  box-sizing: border-box;
  border-top: 1px solid #dbdbdb;
  background-color: #fff;
`;
const CommentWrapper = styled.ul`
  /* display: flex;
  flex-direction: column-reverse; */
`;
export {
  PostItemSection,
  CommentSection,
  PostUserImg,
  BtnDisplay,
  WriteComment,
  WriteCommentSection,
  DetailPostWrapper,
  CommentWrapper,
};
