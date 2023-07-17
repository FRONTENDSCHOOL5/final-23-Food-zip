import React, { useState } from "react";
import FollowItem from "../../components/FollowItem/FollowItem";
import Header from "../../components/common/Header/Header";
import Navigation from "../../components/common/Nav/Navigation";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FollowList, FollowListItem } from "./FollowerListStyle";
import { followerListApi, followingListApi } from "../../api/follow";

export default function FollowerList({ type, followType }) {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const navigate = useNavigate();
  const accountname = location.state.accountname;
  const [followerList, setFollowerList] = useState([]);
  const [followingList, setFollowingList] = useState([]);

  useEffect(() => {
    type === "followers" ? getFollowerList() : getFollowingList();
  }, []);

  const getFollowerList = async () => {
    try {
      const res = await followerListApi(accountname, token);
      setFollowerList(res.data);
    } catch (err) {
      navigate("/error");
    }
  };

  const getFollowingList = async () => {
    try {
      const res = await followingListApi(accountname, token);
      setFollowingList(res.data);
    } catch (err) {
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
                  isfollow={follower.isfollow}
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
                  isfollow={following.isfollow}
                  getFollowerList={getFollowerList}
                  getFollowingList={getFollowingList}
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
