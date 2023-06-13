import React from "react";
import styled from "styled-components";
import Header from "../../../components/common/Header/Header";
import Navigation from "../../../components/common/Nav/Navigation";
import PostList from "../../../components/Post/PostList/PostList";
import ProfileInformation from "../../../components/Profile/ProfileInformation";
import RecommendList from "../../../components/Profile/RecommendList";

export default function MyProfile() {
  const Container = styled.div`
    /* background: rgb(219, 219, 219); */
  `;
  return (
    <Container>
      <Header />
      <ProfileInformation type="my" />
      <RecommendList />
      <PostList />
      <Navigation />
    </Container>
  );
}
