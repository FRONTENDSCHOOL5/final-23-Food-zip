import React from "react";
import styled from "styled-components";
import Header from "../../components/common/Header/Header";
import SearchList from "../../components/Search/SearchList";
import Navigation from "../../components/common/Nav/Navigation";
import PostItem from "../../components/Post/PostItem/PostItem";
const Container = styled.div`
  max-width: 390px;
  margin: 0 auto;
`;
const List = styled.section`
  margin: 48px 0 60px 0;
  height: calc(100vh - 108px);
  background-color: white;
  overflow: auto;
  &::-webkit-scrollbar {
    height: 12px;
  }
  &::-webkit-scrollbar-thumb {
    background: #dbdbdb;
    border-radius: 50px;
    background-clip: padding-box;
    border: 3px solid transparent;
  }
`;
export default function Search() {
  return (
    <Container>
      <Header type="search" />
      <List>
        <SearchList />
      </List>
      <Navigation />
    </Container>
  );
}
