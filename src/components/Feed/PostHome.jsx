import React from "react";
import PostItem from "../Post/PostItem/PostItem";
import styled from "styled-components";
// const Container = styled.div`
//   max-width: 390px;
//   margin: 0 auto;
// `;
const List = styled.section`
  margin: 48px 0 60px 0;
  height: calc(100vh - 108px);
  background-color: white;
  padding: 9px 24px;
  overflow: auto;
  &::-webkit-scrollbar {
    height: 12px;
  }
  &::-webkit-scrollbar-thumb {
    background: #dbdbdb;
    border-radius: 50px;
    background-clip: padding-box;
    border: 5px solid transparent;
  }
`;
export default function PostHome() {
  return (
    <List>
      <PostItem />
      <PostItem />
    </List>
  );
}
