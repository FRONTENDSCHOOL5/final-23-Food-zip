import styled, { css } from "styled-components";

const AlertDiv = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 390px;
`;

const AlertWrapArticle = styled.article`
  width: 252px;
  background-color: white;
  border-radius: 10px;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const AlertTextP = styled.p`
  padding: 22px 56px;
  text-align: center;
  font-size: 16px;
  border-bottom: 1px solid #dbdbdb;
`;

const AlertBottomSection = styled.section`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AlertCommonBtn = css`
  flex-grow: 1;
  font-size: 14px;
  height: 46px;
  background-color: white;
  border: 0;
  border-radius: 0 0 10px 10px;
`;

const AlertCancelBtn = styled.button`
  ${AlertCommonBtn}
`;

const AlertMainBtn = styled.button`
  ${AlertCommonBtn}
  color: #286140;
`;

const AlertLineSpan = styled.span`
  display: inline-block;
  width: 1px;
  height: 46px;
  background-color: #dbdbdb;
`;

export {
  AlertDiv,
  AlertWrapArticle,
  AlertTextP,
  AlertBottomSection,
  AlertCancelBtn,
  AlertMainBtn,
  AlertLineSpan,
};
