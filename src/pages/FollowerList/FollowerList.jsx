import React, { useState } from "react";
import styled from "styled-components";
import FollowItem from "../../components/FollowItem/FollowItem";
import Header from "../../components/common/Header/Header";
import Navigation from "../../components/common/Nav/Navigation";
import axios from "axios";
import post from "../../dummy/dummyapi";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const FollowList = styled.ul`
  padding: 60px 16px 24px;
  background-color: #fff;
  height: 100vh;
`;

const FollowListItem = styled.li`
  margin-bottom: 12px;
`;

export default function FollowerList({ type }) {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const accountname = location.state.accountname;
  const [followerList, setFollowerList] = useState([]);

  useEffect(() => {
    getFollowerList();
  }, []);

  const getFollowerList = async () => {
    try {
      const res = await axios.get(
        `https://api.mandarin.weniv.co.kr/profile/${accountname}/follower`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        },
      );
      console.log(res.data);
      setFollowerList(res.data);
    } catch (err) {
      console.error("에러!!", err);
    }
  };

  return (
    <>
      <Header type={type} />
      <FollowList>
        {followerList.map((follower, index) => {
          return (
            <FollowListItem key={index}>
              <FollowItem
                username={follower.username}
                intro={follower.intro}
                image={follower.image}
              />
            </FollowListItem>
          );
        })}
      </FollowList>
      <Navigation />
    </>
  );
}
