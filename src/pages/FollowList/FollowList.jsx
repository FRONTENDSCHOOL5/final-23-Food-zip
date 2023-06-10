import React from "react";
import styled from "styled-components";
import FollowItem from "../../components/FollowItem/FollowItem";

const FollowLists = styled.ul`
  padding: 24px 16px;
  background-color: #fff;
  height: 100vh;
`;
const FollowListItem = styled.li`
  margin-bottom: 12px;
`;
export default function FollowList() {
  return (
    <FollowLists>
      <FollowListItem>
        <FollowItem />
      </FollowListItem>
      <FollowListItem>
        <FollowItem />
      </FollowListItem>
      <FollowListItem>
        <FollowItem />
      </FollowListItem>
      <FollowListItem>
        <FollowItem />
      </FollowListItem>
    </FollowLists>
  );
}
