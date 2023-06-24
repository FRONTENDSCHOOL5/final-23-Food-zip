import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../components/common/Header/Header";
import ChatNavigation from "../../components/common/Nav/ChatNavigation";
import SendMessage from "../../components/Chat/SendMessage";
import ReceiveMessage from "../../components/Chat/ReceiveMessage";
import Modal from "../../components/Modal/Modal";
import { MessageWrap } from "../../components/Chat/SendMessage";
import { MessageText } from "../../components/Chat/SendMessage";
import { TimeStamp } from "../../components/Chat/SendMessage";

const List = styled.section`
  padding: 48px 0 60px 0;
  height: calc(100vh - 108px);
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export default function ChatRoom() {
  const [modalShow, setModalShow] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [chatValue, setChatValue] = useState([]);

  function modalClose(e) {
    if (e.target === e.currentTarget) {
      setModalShow(false);
    }
  }

  function modalOpen() {
    setModalShow(true);
  }

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
      <Header type="chat" modalOpen={modalOpen} />
      <List>
        <ReceiveMessage />
        <SendMessage />
        {chatValue.map((item, index) => (
          <MessageWrap>
            <MessageText>
              {chatValue[index]}
              <TimeStamp>13:50</TimeStamp>
            </MessageText>
          </MessageWrap>
        ))}
      </List>
      {modalShow && <Modal type="chat" modalClose={modalClose} />}
      <ChatNavigation
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        handleButtonClicked={handleButtonClicked}
      />
    </>
  );
}
