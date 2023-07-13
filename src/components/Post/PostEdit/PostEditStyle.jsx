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
const HeaderLayoutDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  border-bottom: 1px solid #dbdbdb;
  box-sizing: border-box;
  margin-bottom: 20px;
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
  padding: 0 20px 20px 20px;
  border-radius: 5px;
`;
const PostContent = styled.textarea`
  box-sizing: border-box;
  font-size: 15px;
  font-family: "SUIT-Regular";
  border: none;
  resize: none;
  &:focus {
    outline: none;
  }
  width: 100%;
  margin-top: -17px;
  line-height: 20px;
  padding: 0;
`;

export {
  ModalContent,
  ModalOverlay,
  HeaderLayoutDiv,
  HeaderLeftBtn,
  PostContent,
  EditContainer,
};
