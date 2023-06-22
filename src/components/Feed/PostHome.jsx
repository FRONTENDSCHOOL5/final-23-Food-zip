import React, { useState } from "react";
import PostItem from "../Post/PostItem/PostItem";
import styled from "styled-components";
import Modal from "../Modal/Modal";
const List = styled.section`
  background-color: white;
  padding: 57px 24px 69px 24px;
`;
export default function PostHome({ myFeed, modalOpen }) {
  const [modalShow, setModalShow] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  function modalClose(e) {
    if (e.target === e.currentTarget) {
      setModalShow(false);
    }
  }

  function modalOpen(id) {
    setSelectedId(id);
    setModalShow(true);
  }
  return (
    <List>
      <PostItem myFeed={myFeed} modalOpen={modalOpen} />
      {modalShow && (
        <Modal
          type="modification"
          modalClose={modalClose}
          postId={selectedId}
        />
      )}
    </List>
  );
}
