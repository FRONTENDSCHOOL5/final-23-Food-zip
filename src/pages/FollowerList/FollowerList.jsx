import React, { useState } from "react";
import styled from "styled-components";
import FollowItem from "../../components/FollowItem/FollowItem";
import Header from "../../components/common/Header/Header";
import Navigation from "../../components/common/Nav/Navigation";
import axios from "axios";
import post from "../../dummy/dummyapi";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FollowList = styled.ul`
  padding: 60px 16px 24px;
  background-color: #fff;
  height: 100vh;
`;

const FollowListItem = styled.li`
  margin-bottom: 12px;
  cursor: pointer;
`;

export default function FollowerList({ type, followType }) {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const accountname = location.state.accountname;
  const [followerList, setFollowerList] = useState([]);
  const [followingList, setFollowingList] = useState([]);

  // function moveProfile(accountname) {
  //   navigate(`/profile/${accountname}`, {
  //     state: {
  //       accountname: accountname,
  //     },
  //   });
  // }
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
      navigate("/error");
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
      navigate("/error");
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
                  accountname={follower.accountname}
                />
              </FollowListItem>
            );
          })}
        </FollowList>
        <Navigation />
      </>
    ),

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
                  accountname={following.accountname}
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
