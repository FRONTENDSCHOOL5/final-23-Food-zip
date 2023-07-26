import React, { useState, useEffect, useRef } from "react";
import EmptyHome from "../../components/Feed/EmptyHome";
import Header from "../../components/common/Header/Header";
import Navigation from "../../components/common/Nav/Navigation";
import PostHome from "../../components/Feed/PostHome";
import Loading from "../Loading/Loading";
import { feed, feedFetch } from "../../api/post";
// import { useInView } from "react-intersection-observer";

export default function Home() {
  // const [myFeed, setMyFeed] = useState([]);
  // // const [authorInfo, setAuthorInfo] = useState([]);
  // const [loading, setLoading] = useState(true);
  // // const [isEmptyFeed, setIsEmptyFeed] = useState(false); // 새로운 상태 변수
  // // const [page, setPage] = useState(1);
  // const [skip, setSkip] = useState(0);
  // const [infiniteScrollRef, inView] = useInView();
  // const token = localStorage.getItem("token");
  // const options = { token, limit: 10, skip };
  // const [otherInfo, setOtherInfo] = useState(myFeed);

  // const getFeed = async options => {
  //   // setLoading(false);
  //   console.log("getFeed 함수 실행");
  //   const res = await feed(options);
  //   setLoading(false);
  //   console.log(
  //     "options.skip: " +
  //       options.skip +
  //       ", posts.length: " +
  //       res.data.posts.length,
  //   );
  //   setMyFeed(prev => [...prev, ...res.data.posts]);
  //   return res;
  //   // setSkip(options.skip + res.data.posts.length);
  //   // console.log("1. myFeed: ", myFeed);
  // };

  // console.log("2. myFeed: ", myFeed);

  // const loadFeedMore = async () => {
  //   const response = await getFeed(options);
  //   console.log("res", response);
  //   // setMyFeed(prev => [...prev, ...response.data.posts]);
  //   setSkip(options.skip + response.data.posts.length);
  // };

  // console.log("!!", myFeed);

  // useEffect(() => {
  //   setOtherInfo(myFeed);
  //   console.log("실행되거라");
  // }, [myFeed]);

  // useEffect(() => {
  //   console.log("실행됨!");
  //   if (inView) {
  //     console.log("무한스크롤");
  //     loadFeedMore();
  //   }
  // }, [inView]);

  // useEffect(() => {
  //   loadFeedMore();
  // }, []);
  const [loading, setLoading] = useState(true);
  const [myFeed, setMyFeed] = useState([]);
  // const obsRef = useRef(null);
  const [target, setTarget] = useState(null);
  const [skip, setSkip] = useState(0);
  const token = localStorage.getItem("token");
  // const [hasMore, setHasMore] = useState(true);
  // const obsHandler = () => {
  //   setLoading(false);
  //   console.log("실행");
  //   getFeed({ token, limit: 10, skip: myFeed.length });
  // };

  // const observer = new IntersectionObserver(entries => {
  //   entries.forEach(entry => {
  //     if (!entry.isIntersecting) return;
  //     if (loading) return;
  //     obsHandler();
  //   });
  // });

  // const getFeed = async options => {
  //   const res = await feed(options);
  //   setMyFeed(prev => [...prev, ...res.data.posts]);
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   observer.observe(obsRef.current);
  //   console.log("!!", obsRef.current);

  // }, []);

  const getFeed = async options => {
    const res = await feedFetch(options);
    setLoading(false);
    // if (res.data.posts.length === 0) {
    //   setHasMore(false);
    // } else {
    setMyFeed(prev => [...prev, ...res.data.posts]);
    setSkip(options.skip + res.data.posts.length);
    // }
  };

  useEffect(() => {
    let observer;
    if (target) {
      const onIntersect = async ([entry], observer) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          await getFeed({ token, limit: 10, skip });
          observer.observe(entry.target);
        }
      };
      observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  useEffect(() => {
    getFeed({ token, limit: 10, skip });
  }, []);

  return (
    <>
      <Header type="home" />
      {loading ? (
        <Loading />
      ) : myFeed.length > 1 ? (
        <>
          <PostHome myFeed={myFeed} getFeed={getFeed} />
          <div ref={setTarget} />
        </>
      ) : (
        <EmptyHome />
      )}
      <Navigation />
    </>
  );
}
