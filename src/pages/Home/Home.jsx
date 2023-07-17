import React, { useState, useEffect } from "react";
import EmptyHome from "../../components/Feed/EmptyHome";
import Header from "../../components/common/Header/Header";
import Navigation from "../../components/common/Nav/Navigation";
import PostHome from "../../components/Feed/PostHome";
import Loading from "../Loading/Loading";
import { feed } from "../../api/post";

export default function Home() {
  const [myFeed, setMyFeed] = useState([]);
  const [authorInfo, setAuthorInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEmptyFeed, setIsEmptyFeed] = useState(false); // 새로운 상태 변수
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getFeed = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      try {
        const res = await feed(token);

        if (res.data.posts.length === 0) {
          setIsEmptyFeed(true);
        } else {
          setMyFeed(prev => [...prev, ...res.data.posts]);
          const authors = res.data.posts[0].author;
          setAuthorInfo(authors);
        }

        setLoading(false);
      } catch (err) {}
    };
    getFeed();
  }, [page]);

  return (
    <>
      <Header type="home" />
      {loading ? (
        <Loading />
      ) : myFeed.length > 1 ? (
        <PostHome myFeed={myFeed} postInfo={myFeed} authorInfo={authorInfo} />
      ) : (
        <EmptyHome />
      )}
      <Navigation />
    </>
  );
}
