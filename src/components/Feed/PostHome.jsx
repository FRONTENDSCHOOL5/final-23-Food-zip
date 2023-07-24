import React, { useState, useEffect } from "react";
import PostItem from "../Post/PostItem/PostItem";
import styled from "styled-components";
import Modal from "../Modal/Modal/Modal";

const List = styled.ul`
  background-color: white;
  padding: 57px 24px 69px 24px;
`;

export default function PostHome({ myFeed, getFeed, modalOpen, options }) {
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
  // const getOtherInfo = async options => {
  // const token = localStorage.getItem("token");
  // const res = await feed(token);
  // setOtherInfo(res.data.posts);
  // };

  console.log("!!", myFeed);
  useEffect(() => {
    setOtherInfo(myFeed);
    console.log("실행되거라");
  }, [myFeed]);

  return (
    <main>
      <List>
        {otherInfo.map(item => (
          <li key={item.id}>
            <PostItem
              modalOpen={modalOpen}
              otherInfo={item}
              getFeed={getFeed}
              options={options}
              // myFeed={myFeed}
              // getOtherInfo={getOtherInfo}
            />
          </li>
        ))}
        {modalShow && (
          <Modal type="report" modalClose={modalClose} postId={selectedId} />
        )}
        {/* 무한 스크롤을 위한 Ref */}
        {/* <div ref={infiniteScrollRef} /> */}
      </List>
    </main>
  );
}
