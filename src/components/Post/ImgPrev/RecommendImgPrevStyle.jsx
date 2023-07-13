import styled from "styled-components";
import imgbg from "../../../assets/images/img-bg.svg";

const RecommendImgInput = styled.input`
  display: none;
`;
const RecommendImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 0.5px solid #dbdbdb;
  border-radius: 10px;
`;
const EmptyBox = styled.div`
  margin-top: 5px;
  width: 100%;
  height: 204px;
  border-radius: 10px;
  background: url(${imgbg});
`;
const RecommendImgWrapper = styled.div`
  width: 100%;
  height: 236px;
  margin-bottom: 10px;
  position: relative;
`;
const ImgWrapper = styled.div`
  margin-top: 5px;
  width: 100%;
  height: 204px;
`;
const defaultIconPosition = `
  bottom: 44px;
  right: -4px;
`;
const RecommendIconWrapper = styled.label`
  display: inline-block;
  cursor: pointer;
  position: absolute;
  ${props => props.wrapperStyle || defaultIconPosition}
`;
const defaultIconStyle = `
  width: 75%;
  height: 75%;
`;
const RecommendImgIcon = styled.img`
  object-fit: contain;
  border-radius: 10px;
  ${props => props.iconStyle || defaultIconStyle}
`;

export {
  RecommendIconWrapper,
  RecommendImg,
  RecommendImgIcon,
  RecommendImgInput,
  RecommendImgWrapper,
  ImgWrapper,
  EmptyBox,
};
