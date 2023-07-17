import styled from "styled-components";
import ImgButton from "../../../assets/images/upload-file.svg";
import { ButtonStyle } from "../../common/Button/Button";

const ProfileInputForm = styled.form`
  width: 322px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
`;

const ProfileImgDiv = styled.div`
  position: relative;
  margin: 0 auto;
`;

const ProfileInputImgButton = styled.button`
  position: relative;
  &::after {
    content: "";
    position: absolute;
    width: 36px;
    height: 36px;
    bottom: 0;
    right: 0;
    transform: translateY(-30px);
    background: url(${ImgButton}) no-repeat center / cover;
  }
`;

const ProfileImg = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  margin: 30px 0;
  object-fit: cover;
`;

const ProfileInput = styled.input`
  display: none;
`;

const ProfileFormLabel = styled.label`
  color: #767676;
  position: relative;
`;

const ProfileFormInput = styled.input`
  width: 100%;
  display: block;
  margin: 10px 0 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #dbdbdb;
  font-size: 14px;
  &::placeholder {
    color: #dbdbdb;
  }
  &:focus {
    outline: none;
    border-bottom: 1px solid #286140;
  }
`;
const StartButton = styled(ButtonStyle)`
  margin-top: 18px;
`;
const StyledError = styled.small`
  font-size: 12px;
  color: red;
  position: absolute;
  bottom: -10px;
`;

export {
  ProfileInputForm,
  ProfileImgDiv,
  ProfileInputImgButton,
  ProfileImg,
  ProfileInput,
  ProfileFormLabel,
  ProfileFormInput,
  StartButton,
  StyledError,
};
