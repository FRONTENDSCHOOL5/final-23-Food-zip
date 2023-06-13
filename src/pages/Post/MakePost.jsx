import React from "react";
import styled from "styled-components";
import ImgPrev from "../../components/Post/ImgPrev/ImgPrev";
import Header from "../../components/common/Header/Header";

const StyledContainer = styled.div`
  width: 100%;
  height: calc(100vh - 48px);
  padding-top: 48px;
  overflow: hidden;
`;

const StyledPost = styled.textarea`
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: none;
  font-size: 22px;
  resize: none;
  &:focus {
    outline: none;
  }
`;

export default function MakePost() {
  return (
    <div>
      <Header type="upload" active={true} />
      <StyledContainer className="post-wrapper">
        <ImgPrev />
        <form className="post-section">
          <StyledPost
            rows="20"
            className="input-content"
            placeholder="게시글 입력하기"
            // value={input}
            // onChange={onChangeInput}
          ></StyledPost>
        </form>
      </StyledContainer>
    </div>
  );
}
