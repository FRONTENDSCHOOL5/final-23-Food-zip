import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../components/common/Header/Header";
import ChatNavigation from "../../components/common/Nav/ChatNavigation";
import SendMessage from "../../components/Chat/SendMessage";
import ReceiveMessage from "../../components/Chat/ReceiveMessage";
import Modal from "../../components/Modal/Modal/Modal";
import { MessageWrap } from "../../components/Chat/SendMessage";
import { MessageText } from "../../components/Chat/SendMessage";
import { TimeStamp } from "../../components/Chat/SendMessage";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { modalState } from "../../atoms/modalAtom";

const List = styled.section`
  padding: 48px 0 60px 0;
  height: calc(100vh - 108px);
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export default function ChatRoom() {
  const location = useLocation();
  const [modal, setModal] = useRecoilState(modalState);
  const [modalShow, setModalShow] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [chatValue, setChatValue] = useState([]);
  const yourAccountname = location?.state?.yourAccountname || "foodzim";

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  const handleButtonClicked = () => {
    const newChatValue = [...chatValue];
    newChatValue.push(inputValue);
    setChatValue(newChatValue);
    setInputValue("");
  };

  return (
    <>
      <h1 className="a11y-hidden">채팅방 페이지</h1>
      <Header type="chat" yourAccountname={yourAccountname} />
      <List>
        <ReceiveMessage />
        <SendMessage />
        {chatValue.map((item, index) => (
          <MessageWrap>
            <MessageText>
              {chatValue[index]}
              <TimeStamp>14:10</TimeStamp>
            </MessageText>
          </MessageWrap>
        ))}
      </List>
      {modal.show && <Modal type={modal.type} />}
      <ChatNavigation
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        handleButtonClicked={handleButtonClicked}
      />
    </>
  );
}
