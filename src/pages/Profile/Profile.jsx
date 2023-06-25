import React from "react";
import styled from "styled-components";
import ProfileInformation from "../../components/Profile/ProfileInformation";
import PostList from "../../components/Post/PostList/PostList";
import RecommendList from "../../components/Profile/RecommendList";
import Modal from "../../components/Modal/Modal";
import Navigation from "../../components/common/Nav/Navigation";
import Alert from "../../components/Modal/Alert";
import { useState, useEffect } from "react";
import post from "../../dummy/dummyapi";
import Header from "../../components/common/Header/Header";
import RecommendCard from "../../components/Modal/RecommendCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  max-width: 390px;
  margin: 0 auto;
  background-color: #fff;
`;

export default function Profile({ type }) {
  const [modalShow, setModalShow] = useState(false);
  const [modalType, setModalType] = useState("setting");
  const [selectedId, setSelectedId] = useState(null);
  const [cardClosed, setCardClosed] = useState(false);
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
    setCardClosed(true);
    console.log("프로필", cardClosed);
  }

  function cardOpen(id) {
    setSelectedId(id);
    setCardShow(true);
  }
  useEffect(() => {
    if (cardClosed) {
      // cardClosed 값이 true일 때 초기화 코드를 실행
      setCardClosed(false);
    }
  }, [cardClosed]);
  return (
    <Container>
      <Header type="profile" modalOpen={() => modalOpen("setting")} />
      <ProfileInformation type={type} />
      <RecommendList cardOpen={cardOpen} cardClosed={cardClosed} />
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
