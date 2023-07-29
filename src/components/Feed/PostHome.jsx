import React, { useState, useEffect } from "react";
import PostItem from "../Post/PostItem/PostItem";
import styled from "styled-components";
import Modal from "../Modal/Modal/Modal";
import { feed } from "../../api/post";
import { useRef } from "react";
import Loading from "../../pages/Loading/Loading";
import EmptyHome from "./EmptyHome";

const List = styled.ul`
  background-color: white;
  padding: 57px 24px 69px 24px;
`;

export default function PostHome({ modalOpen }) {
  const [modalShow, setModalShow] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [myFeed, setMyFeed] = useState([]);
  const [page, setPage] = useState(0);
  const observer = useRef();
  const token = localStorage.getItem("token");

  const getFeed = async options => {
    const res = await feed(options);
    return res.data.posts;
  };

  const loadFeed = async options => {
    const posts = await getFeed(options);
    setMyFeed(prev => [...prev, ...posts]);
    setSkip(prev => prev + posts.length);
    setLoading(false);
    console.log("피드 로드됨");
  };

  useEffect(() => {
    const onIntersect = entries => {
      console.log("entries", entries);
      const target = entries[0];
      console.log("target", target);
      if (target.isIntersecting) setPage(p => p + 1);
    };
    const io = new IntersectionObserver(onIntersect, { threshold: 0.5 });
    console.log("io: ", io);
    if (observer?.current) {
      io.observe(observer.current);
    }
    return () => io && io.disconnect();
  }, [observer.current]);

  useEffect(() => {
    loadFeed({ token, limit: 10, skip });
  }, [page]);

  function modalClose(e) {
    if (e.target === e.currentTarget) {
      setModalShow(false);
    }
  }

  function modalOpen(id) {
    setSelectedId(id);
    setModalShow(true);
  }
  console.log("POSTHOME's myFeed: ", myFeed);
  console.log("observer.current", observer.current);
  return (
    <>
      {loading ? (
        <Loading />
      ) : myFeed.length > 1 ? (
        <main>
          <List>
            {myFeed.map((item, idx) => (
              <li key={item.id}>
                <p>{idx}</p>
                <PostItem
                  modalOpen={modalOpen}
                  otherInfo={item}
                  getFeed={getFeed}
                />
              </li>
            ))}
            {modalShow && (
              <Modal
                type="report"
                modalClose={modalClose}
                postId={selectedId}
              />
            )}
            {/* 무한 스크롤을 위한 Ref */}
            <div ref={observer}>보임</div>
          </List>
        </main>
      ) : (
        <EmptyHome />
      )}
    </>
  );
}
