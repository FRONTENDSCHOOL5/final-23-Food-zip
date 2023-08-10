import styled from "styled-components";

const ChatNavBar = styled.nav`
  position: fixed;
  max-width: 356px;
  margin: 0 auto;
  /* height: 34px; */
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 13px 16px;
  background-color: white;
`;

const ImageIcon = styled.img`
  width: 36px;
  height: 36px;
`;

const Input = styled.input`
  margin: 0 18px;
  width: 100%;
  font-size: 14px;
  &::placeholder {
    color: #c4c4c4;
  }
`;

const SendBtn = styled.button`
  width: 70px;
  color: ${({ hasText }) => (hasText ? "#286140" : "#C4C4C4")};
  font-size: 14px;
  cursor: pointer;
`;

export { ChatNavBar, Input, ImageIcon, SendBtn };
