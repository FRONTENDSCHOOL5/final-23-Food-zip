import React, { useState } from "react";
import PostItem from "../Post/PostItem/PostItem";
import styled from "styled-components";
import Modal from "../Modal/Modal";
import axios from "axios";
const List = styled.ul`
  background-color: white;
  padding: 57px 24px 69px 24px;
`;
export default function PostHome({ myFeed, modalOpen, authorInfo }) {
  const [modalShow, setModalShow] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [otherInfo, setOtherInfo] = useState(myFeed);
  console.log(myFeed);
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
    try {
      const res = await axios.get(
        `https://api.mandarin.weniv.co.kr/post/feed/?limit=Number&skip=Number`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        },
      );
      setOtherInfo(res.data.posts);
    } catch (err) {}
  };

  console.log("myFeed", myFeed);
  console.log("myNewFeed", otherInfo);
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
