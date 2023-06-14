import React from "react";
import styled from "styled-components";
import Header from "../../components/common/Header/Header";

import ChatNavigation from "../../components/common/Nav/ChatNavigation";
import SendMessage from "../../components/Chat/SendMessage";
import ReceiveMessage from "../../components/Chat/ReceiveMessage";
const List = styled.section`
  margin: 48px 0 60px 0;
  height: calc(100vh - 108px);
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
export default function ChatRoom() {
  return (
    <>
      <Header type="chat" />
      <List>
        <ReceiveMessage />
        <SendMessage />
      </List>
      <ChatNavigation />
    </>
  );
}
