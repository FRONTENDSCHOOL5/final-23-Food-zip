import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const EditContainer = styled.form`
  width: 300px;
`;
const ProductImage = styled.img`
  display: block;
  width: 100%;
  height: 180px;
  border-radius: 10px;
  margin-bottom: 30px;
`;
const HeaderLayoutDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  border-bottom: 1px solid #dbdbdb;
  box-sizing: border-box;
  margin-bottom: 30px;
  background-color: white;
`;
const HeaderLeftBtn = styled.button`
  border: 0;
  padding: 10px;
  padding-left: 0;
  background-color: transparent;
`;
const ModalContent = styled.div`
  background-color: #fff;
  padding: 0 20px 10px 20px;
  border-radius: 5px;
`;

const RecommendInfo = styled.input`
  display: block;
  width: 300px;
  box-sizing: border-box;
  border: none;
  box-shadow: 0 1px 0 0 #dedede;
  height: 42px;
  font-size: 14px;
  margin: 0 auto 30px auto;
  outline: none;
  background: transparent;
  padding: 6px 0 0;
  &:focus {
    border-bottom: #629678;
  }
`;

const SocialSvg = styled.div`
  height: 24px;
`;
export {
  RecommendInfo,
  ModalContent,
  ModalOverlay,
  HeaderLayoutDiv,
  HeaderLeftBtn,
  EditContainer,
  ProductImage,
  SocialSvg,
};
