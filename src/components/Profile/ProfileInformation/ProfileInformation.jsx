import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ProfileBtn from "../ProfileBtn/ProfileBtn";
import {
  InformationTopSection,
  FollowerCntSpan,
  FollowerCntP,
  FollowingCntSpan,
  FollowingCntP,
  InformationSection,
  InfoNameP,
  InfoIdP,
  InfoTextP,
  ProfileImg,
} from "./ProfileInformationStyle";
import Loading from "../../../pages/Loading/Loading";
import { userInfoApi } from "../../../api/user";
import { userProfileApi } from "../../../api/profile";

export default function ProfileInformation({ type, modalOpen }) {
  const [userInfo, setUserInfo] = useState({
    image: "",
    accountname: "",
    username: "",
    followerCount: "",
    followingCount: "",
    isfollow: "",
    intro: "",
  });
  const location = useLocation();
  const [follow, setFollow] = useState(true);
  const [followerInfo, setFollowerInfo] = useState([]);
  const myId = localStorage.getItem("_id");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const yourAccountname = location.state;
    const myAccountname = localStorage.getItem("accountname");

    const getUserInfo = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (type === "my") {
        const res = await userInfoApi(token);
        setFollowerInfo(res.data.user.follower);
        const {
          accountname,
          username,
          followingCount,
          followerCount,
          image,
          isfollow,
          intro,
        } = res.data.user;

        setUserInfo({
          accountname,
          username,
          followingCount,
          followerCount,
          image,
          isfollow,
          intro,
        });
      } else if (type === "your" && yourAccountname) {
        const res = await userProfileApi(yourAccountname.accountname, token);
        setFollowerInfo(res.data.profile.follower);
        const {
          accountname,
          username,
          followingCount,
          followerCount,
          image,
          isfollow,
          intro,
        } = res.data.profile;

        setUserInfo({
          accountname,
          username,
          followingCount,
          followerCount,
          image,
          isfollow,
          intro,
        });
      }

      setLoading(false);
    };

    if (type === "your" && yourAccountname) {
      setUserInfo({
        image: "",
        accountname: "",
        username: "",
        followerCount: "",
        followingCount: "",
        isfollow: "",
        intro: "",
      });
      getUserInfo();
    } else if (type === "my" && myAccountname) {
      setUserInfo({
        image: "",
        accountname: "",
        username: "",
        followerCount: "",
        followingCount: "",
        isfollow: "",
        intro: "",
      });
      getUserInfo();
    }
  }, [location, follow]);

  useEffect(() => {
    const following = followerInfo.some(x => x === myId);
    setFollow(!following);
    localStorage.setItem("follow", !following ? "false" : "true");
  }, [followerInfo]);

  useEffect(() => {
    const savedFollow = localStorage.getItem("follow");
    setFollow(savedFollow === "false");
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <InformationTopSection>
            <Link
              to="/followerlist"
              state={{
                accountname: userInfo.accountname,
              }}
            >
              <FollowerCntSpan>{userInfo.followerCount}</FollowerCntSpan>
              <FollowerCntP>followers</FollowerCntP>
            </Link>
            <ProfileImg src={userInfo.image} alt="프로필 이미지" />
            <Link
              to="/followinglist"
              state={{
                accountname: userInfo.accountname,
              }}
            >
              <FollowingCntSpan>{userInfo.followingCount}</FollowingCntSpan>
              <FollowingCntP>followings</FollowingCntP>
            </Link>
          </InformationTopSection>
          <InformationSection>
            <InfoNameP>{userInfo.username}</InfoNameP>
            <InfoIdP>@ {userInfo.accountname}</InfoIdP>
            <InfoTextP>{userInfo.intro}</InfoTextP>
          </InformationSection>
          <ProfileBtn
            type={type}
            yourAccountname={userInfo.accountname}
            setFollow={setFollow}
            follow={follow}
          />
        </>
      )}
    </>
  );
}
