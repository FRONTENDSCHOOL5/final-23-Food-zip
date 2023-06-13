import React from "react";
import styled from "styled-components";
import FollowItem from "../../components/FollowItem/FollowItem";
import Header from "../../components/common/Header/Header";
import Navigation from "../../components/common/Nav/Navigation";
const FollowLists = styled.ul`
  padding: 60px 16px 24px;
  background-color: #fff;
  height: 100vh;
`;
const FollowListItem = styled.li`
  margin-bottom: 12px;
`;
export default function FollowerList() {
  const followItem = [];
  for (let i = 0; i < 15; i++) {
    followItem.push(
      <FollowListItem>
        <FollowItem />
      </FollowListItem>,
    );
  }
  return (
    <>
      <Header type="followers" />
      <FollowLists>{followItem}</FollowLists>
      <Navigation />
    </>
  );
}
