import { useState } from "react";
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import EmptyHome from "../../components/Feed/EmptyHome";
import Header from "../../components/common/Header/Header";
import Navigation from "../../components/common/Nav/Navigation";
import PostHome from "../../components/Feed/PostHome";
import { useEffect } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";

const Container = styled.div`
  max-width: 390px;
  margin: 0 auto;
  background-color: #fff;
`;
export default function Home() {
  const [myFeed, setMyFeed] = useState([]);
  const [authorInfo, setAuthorInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFeed = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          "https://api.mandarin.weniv.co.kr/post/feed",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-type": "application/json",
            },
          },
        );
        console.log("데이터", res.data);
        setMyFeed(res.data.posts);
        const authors = res.data.posts[0].author;
        setAuthorInfo(authors);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    getFeed();
  }, []);
  return (
    <Container>
      <Header type="home" />
      {loading ? <Loading /> : null}
      {myFeed.length > 1 ? (
        <PostHome myFeed={myFeed} postInfo={myFeed} authorInfo={authorInfo} />
      ) : (
        <EmptyHome />
      )}
      <Navigation />
    </Container>
  );
}
