import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../components/common/Header/Header";
import ChatListItem from "../../components/Chat/ChatListItem";
import Modal from "../../components/Modal/Modal/Modal";
import Alert from "../../components/Modal/Alert/Alert";
import Navigation from "../../components/common/Nav/Navigation";
const Container = styled.div`
  max-width: 390px;
  margin: 0 auto;
`;
const List = styled.section`
  padding: 48px 0 60px 0;
  background-color: white;
`;
export default function ChatList() {
  const [modalShow, setModalShow] = useState(false);
  function modalClose(e) {
    if (e.target === e.currentTarget) {
      setModalShow(false);
    }
  }

  function modalOpen() {
    setModalShow(true);
  }

  const [alertShow, setAlertShow] = useState(false);
  function alertClose(e) {
    if (e.target === e.currentTarget) {
      setAlertShow(false);
    }
  }

  function alertOpen() {
    setAlertShow(true);
  }

  return (
    <Container>
      <Header type="profile" modalOpen={modalOpen} />
      <List>
        <ChatListItem />
      </List>
      {modalShow && (
        <Modal type="setting" modalClose={modalClose} alertOpen={alertOpen} />
      )}
      {alertShow && <Alert type="logout" alertClose={alertClose} />}
      <Navigation />
    </Container>
  );
}
