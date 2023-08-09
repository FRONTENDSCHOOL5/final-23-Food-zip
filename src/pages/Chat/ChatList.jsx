import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../components/common/Header/Header";
import ChatListItem from "../../components/Chat/ChatListItem";
import Modal from "../../components/Modal/Modal/Modal";
// import Alert from "../../components/Modal/Alert/Alert";
import Navigation from "../../components/common/Nav/Navigation";
import { useRecoilState } from "recoil";
import { modalState } from "../../atoms/modalAtom";

const List = styled.section`
  padding: 48px 0 60px 0;
  background-color: white;
  height: calc(100vh - 108px);
`;
export default function ChatList() {
  // const [modalShow, setModalShow] = useState(false);
  // function modalClose(e) {
  //   if (e.target === e.currentTarget) {
  //     setModalShow(false);
  //   }
  // }

  // function modalOpen() {
  //   setModalShow(true);
  // }

  // const [alertShow, setAlertShow] = useState(false);
  // function alertClose(e) {
  //   if (e.target === e.currentTarget) {
  //     setAlertShow(false);
  //   }
  // }

  // function alertOpen() {
  //   setAlertShow(true);
  // }
  const [modal, setModal] = useRecoilState(modalState);
  console.log(modal);
  return (
    <>
      <h1 className="a11y-hidden">채팅 리스트 페이지</h1>
      {/* <Header type="profile" modalOpen={modalOpen} /> */}
      <Header type="profile" />
      <List>
        <ChatListItem />
      </List>
      {/* {modalShow && (
        <Modal type="setting" modalClose={modalClose} alertOpen={alertOpen} />
      )} */}
      {modal.show && <Modal type={modal.type} />}
      {/* {alertShow && <Alert type="logout" alertClose={alertClose} />} */}
      <Navigation />
    </>
  );
}
