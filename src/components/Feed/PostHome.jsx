import React, { useState } from "react";
import PostItem from "../Post/PostItem/PostItem";
import styled from "styled-components";
import Modal from "../Modal/Modal/Modal";
import { feed } from "../../api/post";

const List = styled.ul`
  background-color: white;
  padding: 57px 24px 69px 24px;
`;

export default function PostHome({ myFeed, modalOpen, authorInfo }) {
  const [modalShow, setModalShow] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [otherInfo, setOtherInfo] = useState(myFeed);
  function modalClose(e) {
    if (e.target === e.currentTarget) {
      setModalShow(false);
    }
  }

  function modalOpen(id) {
    setSelectedId(id);
    setModalShow(true);
  }
  const getOtherInfo = async () => {
    const token = localStorage.getItem("token");
    const res = await feed(token);
    setOtherInfo(res.data.posts);
  };

  return (
    <List>
      <PostItem
        modalOpen={modalOpen}
        otherInfo={otherInfo}
        authorInfo={authorInfo}
        getOtherInfo={getOtherInfo}
      />
      {modalShow && (
        <Modal type="report" modalClose={modalClose} postId={selectedId} />
      )}
    </List>
  );
}
