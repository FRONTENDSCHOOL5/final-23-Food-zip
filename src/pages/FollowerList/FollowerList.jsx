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

export default function FollowerList({ type, followType }) {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const accountname = location.state.accountname;
  const [followerList, setFollowerList] = useState([]);
  const [followingList, setFollowingList] = useState([]);

  useEffect(() => {
    type === "followers" ? getFollowerList() : getFollowingList();
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
      setFollowerList(res.data);
      console.log("followers", res.data);
    } catch (err) {
      console.error("에러!!", err);
    }
  };
  const getFollowingList = async () => {
    try {
      const res = await axios.get(
        `https://api.mandarin.weniv.co.kr/profile/${accountname}/following`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        },
      );
      setFollowingList(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  const followTypeUI = {
    followerList: (
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
    ),
    // 팔로잉 리스트에서 내가 팔로우하지 않는 사람이라면 팔로우버튼 활성화
    // 팔로우 했다면 취소 버튼 활성화
    followingList: (
      <>
        <Header type={type} />
        <FollowList>
          {followingList.map((following, index) => {
            return (
              <FollowListItem key={index}>
                <FollowItem
                  username={following.username}
                  intro={following.intro}
                  image={following.image}
                />
              </FollowListItem>
            );
          })}
        </FollowList>
        <Navigation />
      </>
    ),
  };
  return <>{followTypeUI[followType]}</>;
}
