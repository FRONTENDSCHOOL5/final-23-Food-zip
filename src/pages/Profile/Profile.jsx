import React from "react";
import ProfileInformation from "../../components/Profile/ProfileInformation";
import PostList from "../../components/Post/PostList/PostList";
import RecommendList from "../../components/Profile/RecommendList";
import Modal from "../../components/Modal/Modal";
import Navigation from "../../components/common/Nav/Navigation";
import { useState } from "react";

export default function Profile() {
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
    <div>
      <ProfileInformation type="my" modalOpen={modalOpen} />
      <RecommendList />
      <PostList />
      {modalShow && <Modal type="setting" modalClose={modalClose} />}
      <Navigation />
    </div>
  );
}
