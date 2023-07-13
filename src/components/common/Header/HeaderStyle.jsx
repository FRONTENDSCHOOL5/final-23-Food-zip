import styled from "styled-components";
import fulllogo from "../../../assets/images/full-logo-xs.svg";

const HeaderWrap = styled.header`
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  max-width: 390px;
`;

const HeaderLayoutSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  padding: 0px 16px;
  border-bottom: 1px solid #dbdbdb;
  box-sizing: border-box;
  background-color: white;
`;

const HeaderTitle = styled.h1`
  font-size: 18px;
  font-weight: 600;
`;

const HeaderLeftBtn = styled.button`
  border: 0;
  padding: 10px;
  padding-left: 0;
  background-color: transparent;
`;

const HeaderRightBtn = styled.button`
  border: 0;
  padding: 10px;
  padding-right: 0;
  background-color: transparent;
`;

const HeaderSearchInp = styled.input`
  width: 316px;
  background-color: #f2f2f2;
  border: 0;
  border-radius: 32px;
  padding: 7px 16px;
  font-size: 14px;
  box-sizing: border-box;
  &:focus {
    outline: 0;
  }
  &::placeholder {
    color: #c4c4c4;
  }
`;

const HeaderSpan = styled.span`
  display: flex;
  align-items: center;
`;

const HeaderTextP = styled.p`
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
`;

const HeaderLogoBtn = styled.button`
  background: url(${fulllogo}) no-repeat center center;
  width: 20px;
  height: 20px;
  margin-right: 216px;
`;

export {
  HeaderWrap,
  HeaderLayoutSection,
  HeaderTitle,
  HeaderLeftBtn,
  HeaderRightBtn,
  HeaderSearchInp,
  HeaderSpan,
  HeaderTextP,
  HeaderLogoBtn,
};
