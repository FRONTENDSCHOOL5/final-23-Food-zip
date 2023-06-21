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

const Container = styled.div`
  max-width: 390px;
  margin: 0 auto;
  background-color: #fff;
`;
export default function Home() {
  const [myFeed, setMyFeed] = useState([]);
  useEffect(() => {
    const getFeed = async () => {
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
        console.log(res.data);
        setMyFeed(res.data.posts);
      } catch (err) {
        console.error(err);
      }
    };
    getFeed();
  }, []);
  console.log(myFeed);
  return (
    <Container>
      <Header type="home" />
      {/* <EmptyHome /> */}
      <PostHome myFeed={myFeed} />
      <Navigation />
    </Container>
  );
}
