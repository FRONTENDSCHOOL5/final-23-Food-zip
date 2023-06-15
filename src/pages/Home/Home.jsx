import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import EmptyHome from "../../components/Feed/EmptyHome";
import Header from "../../components/common/Header/Header";
import Navigation from "../../components/common/Nav/Navigation";
import PostHome from "../../components/Feed/PostHome";
const Container = styled.div`
  max-width: 390px;
  margin: 0 auto;
  background-color: #fff;
`;
const List = styled.section`
  margin: 48px 0 60px 0;
  height: calc(100vh - 108px);
  background-color: white;
`;
export default function Home() {
  return (
    <Container>
      <Header type="home" />
      <EmptyHome />
      <List>
        <PostHome />
      </List>
      <Navigation />
    </Container>
  );
}
