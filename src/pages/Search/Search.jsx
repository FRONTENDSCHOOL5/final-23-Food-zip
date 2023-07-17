import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../components/common/Header/Header";
import SearchList from "../../components/Search/SearchList";
import Navigation from "../../components/common/Nav/Navigation";

const List = styled.section`
  padding: 48px 0 60px 0;
  height: calc(100vh - 108px);
  background-color: white;
`;

export default function Search() {
  const [searchKeyword, setSearchKeyword] = useState("");
  function handleSearchKeyword(event) {
    setSearchKeyword(event.target.value);
  }
  return (
    <>
      <h1 className="a11y-hidden">검색 페이지</h1>
      <Header
        type="search"
        searchKeyword={searchKeyword}
        handleSearchKeyword={handleSearchKeyword}
      />
      <List>
        <SearchList searchKeyword={searchKeyword} />
      </List>
      <Navigation />
    </>
  );
}
