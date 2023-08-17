import React, { useState, useEffect } from "react";
import PostItem from "../Post/PostItem/PostItem";
import styled from "styled-components";
import Modal from "../Modal/Modal/Modal";
import { feed } from "../../api/post";
import { useRef } from "react";
import Loading from "../../pages/Loading/Loading";
import EmptyHome from "./EmptyHome";
import { useRecoilState } from "recoil";
import { modalState } from "../../atoms/modalAtom";

const List = styled.ul`
  background-color: white;
  padding: 57px 24px 69px 24px;
`;

export default function PostHome() {
  const [modal, setModal] = useRecoilState(modalState);
  // const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [myFeed, setMyFeed] = useState([]);
  const [page, setPage] = useState(0);
  const observer = useRef();
  const token = localStorage.getItem("token");
  const getFeed = async options => {
    const res = await feed(options);
    if (options.test === 1) setMyFeed(res.data.posts);
    return res.data.posts;
  };

  const loadFeed = async options => {
    const posts = await getFeed(options);
    console.log("posts", posts);
    console.log("skip", skip);
    setMyFeed(prev => [...prev, ...posts]);
    setSkip(prev => prev + posts.length);
    setLoading(false);
    // console.log("피드 로드됨");
  };
  console.log("myFeed: ", myFeed);
  useEffect(() => {
    const onIntersect = entries => {
      const target = entries[0];
      console.log("감지됨", target);
      if (target.isIntersecting) setPage(p => p + 1);
    };
    const io = new IntersectionObserver(onIntersect, { threshold: 0.5 });

    if (observer?.current) {
      io.observe(observer.current);
    }
    return () => io && io.disconnect();
  }, [observer, loading]);

  useEffect(() => {
    loadFeed({ token, limit: 10, skip });
  }, [page]);

  const modalOpen = id => {
    setModal({
      show: true,
      postId: id,
    });
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : myFeed.length > 1 ? (
        <main>
          <List>
            {myFeed.map(item => (
              <li key={item.id}>
                <PostItem
                  modalOpen={modalOpen}
                  otherInfo={item}
                  getFeed={getFeed}
                  commentCnt={item.commentCount}
                  // loadFeed={loadFeed}
                  skip={skip}
                />
              </li>
            ))}
            {modal.show && <Modal type="report" />}
            {/* 무한 스크롤을 위한 Ref */}
            <div ref={observer} />
          </List>
        </main>
      ) : (
        <EmptyHome />
      )}
    </>
  );
}
