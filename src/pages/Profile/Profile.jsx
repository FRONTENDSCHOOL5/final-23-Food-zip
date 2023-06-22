import React from "react";
import styled from "styled-components";
import ProfileInformation from "../../components/Profile/ProfileInformation";
import PostList from "../../components/Post/PostList/PostList";
import RecommendList from "../../components/Profile/RecommendList";
import Modal from "../../components/Modal/Modal";
import Navigation from "../../components/common/Nav/Navigation";
import Alert from "../../components/Modal/Alert";
import { useState } from "react";
import post from "../../dummy/dummyapi";
import Header from "../../components/common/Header/Header";
import RecommendCard from "../../components/Modal/RecommendCard";

const Container = styled.div`
  max-width: 390px;
  margin: 0 auto;
  background-color: #fff;
`;

export default function Profile({ type }) {
  const [modalShow, setModalShow] = useState(false);
  const [modalType, setModalType] = useState("setting");
  const [selectedId, setSelectedId] = useState(null);

  function modalClose(e) {
    if (e.target === e.currentTarget) {
      setModalShow(false);
    }
  }

  function modalOpen(type) {
    setModalShow(true);
    setModalType(type);
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

  const [cardShow, setCardShow] = useState(false);
  function cardClose(e) {
    if (e.target === e.currentTarget) {
      setCardShow(false);
    }
  }

  function cardOpen(id) {
    setSelectedId(id);
    setCardShow(true);
  }

  return (
    <Container>
      <Header type="profile" modalOpen={() => modalOpen("setting")} />
      <ProfileInformation type={type} />
      <RecommendList cardOpen={cardOpen} />
      <PostList post={post} />
      {modalShow && (
        <Modal type={modalType} modalClose={modalClose} alertOpen={alertOpen} />
      )}
      {alertShow && <Alert type="logout" alertClose={alertClose} />}
      {cardShow && <RecommendCard cardClose={cardClose} id={selectedId} />}
      <Navigation />
    </Container>
  );
}
