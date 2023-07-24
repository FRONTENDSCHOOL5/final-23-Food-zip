import React, { useState, useEffect } from "react";
import EmptyHome from "../../components/Feed/EmptyHome";
import Header from "../../components/common/Header/Header";
import Navigation from "../../components/common/Nav/Navigation";
import PostHome from "../../components/Feed/PostHome";
import Loading from "../Loading/Loading";
import { feed } from "../../api/post";
import { useInView } from "react-intersection-observer";

export default function Home() {
  const [myFeed, setMyFeed] = useState([]);
  // const [authorInfo, setAuthorInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [isEmptyFeed, setIsEmptyFeed] = useState(false); // 새로운 상태 변수
  // const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const [infiniteScrollRef, inView] = useInView();
  const token = localStorage.getItem("token");
  const options = { token, limit: 10, skip };
  const [otherInfo, setOtherInfo] = useState(myFeed);

  const getFeed = async options => {
    // setLoading(false);
    console.log("getFeed 함수 실행");
    const res = await feed(options);
    setLoading(false);
    console.log(
      "options.skip: " +
        options.skip +
        ", posts.length: " +
        res.data.posts.length,
    );
    setMyFeed(prev => [...prev, ...res.data.posts]);
    return res;
    // setSkip(options.skip + res.data.posts.length);
    // console.log("1. myFeed: ", myFeed);
  };

  console.log("2. myFeed: ", myFeed);

  const loadFeedMore = async () => {
    const response = await getFeed(options);
    console.log("res", response);
    // setMyFeed(prev => [...prev, ...response.data.posts]);
    setSkip(options.skip + response.data.posts.length);
  };

  console.log("!!", myFeed);

  useEffect(() => {
    setOtherInfo(myFeed);
    console.log("실행되거라");
  }, [myFeed]);

  useEffect(() => {
    console.log("실행됨!");
    if (inView) {
      console.log("무한스크롤");
      loadFeedMore();
    }
  }, [inView]);

  useEffect(() => {
    loadFeedMore();
  }, []);

  return (
    <>
      <Header type="home" />
      {loading ? (
        <Loading />
      ) : myFeed.length > 1 ? (
        <>
          <PostHome myFeed={myFeed} getFeed={getFeed} options={options} />
          <div ref={infiniteScrollRef} />
        </>
      ) : (
        <EmptyHome />
      )}
      <Navigation />
    </>
  );
}
