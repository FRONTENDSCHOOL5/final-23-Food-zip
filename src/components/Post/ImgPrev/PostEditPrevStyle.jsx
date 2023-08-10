import styled from "styled-components";
import closeBtn from "../../../assets/images/close-btn.svg";

const UploadContainer = styled.div`
  width: 100%;
  padding: 20px 16px;
  overflow-x: auto;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  white-space: nowrap;
  border-bottom: 1px solid #c4c4c4;
`;

const UploadImgWrapper = styled.label`
  display: inline-block;
  width: 90px;
  height: 90px;
  flex-shrink: 0;
  cursor: pointer;
  margin-right: 10px;
`;

const UploadImgInput = styled.input`
  display: none;
`;

const UploadImgIcon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;
const UploadImgDiv = styled.div`
  position: relative;
`;
const UploadImg = styled.img`
  max-width: 90px;
  max-height: 90px;
  object-fit: contain;
  border-radius: 10px;
  border: 1px solid #eee;
  box-sizing: border-box;
`;
const CloseImgBtn = styled.button`
  background: url(${closeBtn}) center center / 18px 18px no-repeat;
  width: 18px;
  height: 18px;
  position: absolute;
  top: 4px;
  right: 4px;
`;

export {
  UploadContainer,
  UploadImg,
  UploadImgDiv,
  UploadImgIcon,
  UploadImgInput,
  UploadImgWrapper,
  CloseImgBtn,
};
