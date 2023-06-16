import React from "react";
import styled, { css } from "styled-components";
import ProfileImage from "../../assets/images/basic-profile-lg.svg";
import ProfileBtn from "./ProfileBtn";
import Header from "../common/Header/Header";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const ProfileInfoWrapDiv = styled.div`
  width: 100%;
  padding: 78px 55px 26px;
  box-sizing: border-box;
  border-bottom: 1px solid #dbdbdb;
  background-color: white;
`;

const InformationTopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const FollowCommonSpan = css`
  font-size: 18px;
  font-weight: 600;
`;

const FollowCommonP = css`
  font-size: 10px;
  margin-top: 6px;
  color: #767676;
`;

const FollowerCntSpan = styled.span`
  ${FollowCommonSpan}
`;

const FollowerCntP = styled.p`
  ${FollowCommonP}
`;

const FollowingCntSpan = styled.span`
  ${FollowCommonSpan}
  color: #767676;
`;

const FollowingCntP = styled.p`
  ${FollowCommonP}
`;

const InformationDiv = styled.div`
  text-align: center;
  margin: 16px 0 24px;
`;

const InfoNameP = styled.p`
  font-size: 16px;
  font-weight: 600;
`;

const InfoIdP = styled.p`
  font-size: 12px;
  color: #767676;
  margin: 6px 0 16px;
`;

const InfoTextP = styled.p`
  font-size: 14px;
  color: #767676;
`;
const ProfileImg = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 50%;
`;
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
  useEffect(() => {
    getUserInfo();
  }, []);
  const getUserInfo = async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    const res = await axios.get(
      "https://api.mandarin.weniv.co.kr/user/myinfo",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
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
  };
  console.log(userInfo);
  return (
    <>
      <Header type="profile" modalOpen={modalOpen} />
      <ProfileInfoWrapDiv>
        <InformationTopDiv>
          <a href="#!">
            <FollowerCntSpan>{userInfo.followerCount}</FollowerCntSpan>
            <FollowerCntP>followers</FollowerCntP>
          </a>
          <ProfileImg src={userInfo.image} alt="프로필 이미지" />
          <a href="#!">
            <FollowingCntSpan>{userInfo.followingCount}</FollowingCntSpan>
            <FollowingCntP>followings</FollowingCntP>
          </a>
        </InformationTopDiv>
        <InformationDiv>
          <InfoNameP>{userInfo.username}</InfoNameP>
          <InfoIdP>@ {userInfo.accountname}</InfoIdP>
          <InfoTextP>{userInfo.intro}</InfoTextP>
        </InformationDiv>
        <ProfileBtn type={type} />
      </ProfileInfoWrapDiv>
    </>
  );
}
