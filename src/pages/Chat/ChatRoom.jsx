import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../components/common/Header/Header";
import ChatNavigation from "../../components/common/Nav/ChatNavigation";
import SendMessage from "../../components/Chat/SendMessage";
import ReceiveMessage from "../../components/Chat/ReceiveMessage";
import Modal from "../../components/Modal/Modal";
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
  function modalClose(e) {
    if (e.target === e.currentTarget) {
      setModalShow(false);
    }
  }

  function modalOpen() {
    setModalShow(true);
  }

  return (
    <>
      <Header type="chat" modalOpen={modalOpen} />
      <List>
        <ReceiveMessage />
        <SendMessage />
      </List>
      {modalShow && <Modal type="chat" modalClose={modalClose} />}
      <ChatNavigation />
    </>
  );
}
