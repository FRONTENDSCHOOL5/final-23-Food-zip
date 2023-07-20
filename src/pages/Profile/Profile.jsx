import React from "react";
import ProfileInformation from "../../components/Profile/ProfileInformation/ProfileInformation";
import PostList from "../../components/Post/PostList/PostList";
import RecommendList from "../../components/Profile/RecommendList/RecommendList";
import Modal from "../../components/Modal/Modal/Modal";
import Navigation from "../../components/common/Nav/Navigation";
import Alert from "../../components/Modal/Alert/Alert";
import { useState, useEffect } from "react";
import Header from "../../components/common/Header/Header";
import RecommendCard from "../../components/Modal/RecommendCard/RecommendCard";

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
  }

  function cardOpen(id) {
    setSelectedId(id);
    setCardShow(true);
  }
  useEffect(() => {
    if (cardClosed) {
      setCardClosed(false);
    }
  }, [cardClosed]);

  return (
    <>
      <Header type="profile" modalOpen={() => modalOpen("setting")} />
      <main>
        <ProfileInformation type={type} />
        <RecommendList cardOpen={cardOpen} cardClosed={cardClosed} />
        <PostList />
        {modalShow && (
          <Modal
            type={modalType}
            modalClose={modalClose}
            alertOpen={alertOpen}
          />
        )}
        {alertShow && <Alert type="logout" alertClose={alertClose} />}
        {cardShow && <RecommendCard cardClose={cardClose} id={selectedId} />}
      </main>
      <Navigation />
    </>
  );
}
