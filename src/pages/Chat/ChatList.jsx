import React from "react";
import styled from "styled-components";
import Header from "../../components/common/Header/Header";
import ChatListItem from "../../components/Chat/ChatListItem";
import Navigation from "../../components/common/Nav/Navigation";
const Container = styled.div`
  max-width: 390px;
  margin: 0 auto;
`;
const List = styled.section`
  margin: 48px 0 60px 0;
  height: calc(100vh - 108px);
  background-color: white;
`;
export default function ChatList() {
  return (
    <Container>
      <Header type="profile" />
      <List>
        <ChatListItem />
      </List>
      <Navigation />
    </Container>
  );
}
