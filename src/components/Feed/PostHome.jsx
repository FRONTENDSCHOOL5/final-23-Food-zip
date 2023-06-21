import React from "react";
import PostItem from "../Post/PostItem/PostItem";
import styled from "styled-components";
const List = styled.section`
  background-color: white;
  padding: 57px 24px 69px 24px;
`;
export default function PostHome({ myFeed }) {
  return (
    <List>
      <PostItem myFeed={myFeed} />
    </List>
  );
}
