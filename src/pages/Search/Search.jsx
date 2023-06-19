import React from "react";
import styled from "styled-components";
import Header from "../../components/common/Header/Header";
import SearchList from "../../components/Search/SearchList";
import Navigation from "../../components/common/Nav/Navigation";
const Container = styled.div`
  max-width: 390px;
  margin: 0 auto;
`;
const List = styled.section`
  padding: 48px 0 60px 0;
  background-color: white;
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
