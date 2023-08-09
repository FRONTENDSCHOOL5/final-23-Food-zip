import React from "react";
import ProfileInformation from "../../components/Profile/ProfileInformation/ProfileInformation";
import PostList from "../../components/Post/PostList/PostList";
import RecommendList from "../../components/Profile/RecommendList/RecommendList";
// import Modal from "../../components/Modal/Modal/Modal";
import Navigation from "../../components/common/Nav/Navigation";
// import Alert from "../../components/Modal/Alert/Alert";
import { useState, useEffect } from "react";
import Header from "../../components/common/Header/Header";
import RecommendCard from "../../components/Modal/RecommendCard/RecommendCard";
// import { useRecoilState } from "recoil";
// import { modalState } from "../../atoms/modalAtom";

export default function Profile({ type }) {
  // const [modalShow, setModalShow] = useState(false);
  // const [modalType, setModalType] = useState("setting");
  // const [modal, setModal] = useRecoilState(modalState);
  const [selectedId, setSelectedId] = useState(null);
  const [cardClosed, setCardClosed] = useState(false);
  // console.log(modal);
  // function modalClose(e) {
  //   if (e.target === e.currentTarget) {
  //     setModal(prevModal => ({ ...prevModal, show: false }));
  //   }
  // }
  // function modalOpen() {
  //   setModal(prevModal => ({ ...prevModal, show: true }));
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
  // function alertOpen(customType) {
  //   setAlertShow(true);
  //   setAlertType(customType || type);
  // }

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
      {/* <Header type="profile" modalOpen={modalOpen} /> */}
      <Header type="profile" />
      <main>
        <ProfileInformation type={type} />
        <RecommendList cardOpen={cardOpen} cardClosed={cardClosed} />
        <PostList />
        {/* {modal.show && <Modal type={modal.type} modalClose={modalClose} />} */}
        {/* {modal.show && <Modal type={modal.type} />} */}
        {/* {alertShow && <Alert type="logout" alertClose={alertClose} />} */}
        {cardShow && <RecommendCard cardClose={cardClose} id={selectedId} />}
      </main>
      <Navigation />
    </>
  );
}
