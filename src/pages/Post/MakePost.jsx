import React from "react";
import uploadPhoto from "../../assets/images/upload-file.svg";
import styled from "styled-components";

const StyledContainer = styled.div`
  width: 100%;
  position: relative;
  height: 100vh;
`;

const StyledPost = styled.textarea`
  width: 100%;
  height: 100vh;
  border: none;
  resize: none;
  &:focus {
    outline: none;
  }
`;
const UploadContainer = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
`;
const UploadImgWrapper = styled.label`
  display: inline-block;
  width: 50px;
  height: 50px;
  cursor: pointer;
`;

const UploadImgInput = styled.input`
  display: none;
`;

const UploadImgIcon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default function MakePost() {
  return (
    <div>
      <StyledContainer className="post-wrapper">
        <form className="post-section">
          <StyledPost
            className="input-content"
            placeholder="게시글 입력하기"
            // value={input}
            // onChange={onChangeInput}
          ></StyledPost>
        </form>
        <UploadContainer>
          <UploadImgWrapper htmlFor="file-input" className="upload-img">
            <UploadImgInput type="file" id="file-input" />
            <UploadImgIcon src={uploadPhoto} alt="사진을 올리는 버튼 이미지" />
          </UploadImgWrapper>
        </UploadContainer>
      </StyledContainer>
    </div>
  );
}
