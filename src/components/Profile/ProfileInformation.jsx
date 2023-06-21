import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import ProfileBtn from "./ProfileBtn";
import axios from "axios";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const InformationTopDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-top: 78px;
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
  margin: 0 40px;
  border-radius: 50%;
  border: 1px solid #dbdbdb;
  object-fit: cover;
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
  const location = useLocation();

  // { accountname } = useParams();
  // console.log("profile:", yourAccountname);
  useEffect(() => {
    const yourAccountname = location.state;
    const myAccountname = localStorage.getItem("accountname");
    console.log("profile:", yourAccountname);
    const getUserInfo = async () => {
      const token = localStorage.getItem("token");
      let apiUrl = "";
      if (type === "my") {
        apiUrl = "https://api.mandarin.weniv.co.kr/user/myinfo";
      } else if (type === "your" && yourAccountname) {
        apiUrl = `https://api.mandarin.weniv.co.kr/profile/${yourAccountname.accountname}`;
      }
      const res = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-type": "application/json",
        },
      });
      console.log("resData", res);
      if (type === "your") {
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
      } else if (type === "my" && myAccountname) {
        console.log("resData", res);
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
      }
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
  }, [location]);

  return (
    <>
      <InformationTopDiv>
        <Link to="/followerlist">
          <FollowerCntSpan>{userInfo.followerCount}</FollowerCntSpan>
          <FollowerCntP>followers</FollowerCntP>
        </Link>
        <ProfileImg src={userInfo.image} alt="프로필 이미지" />
        <Link to="/followinglist">
          <FollowingCntSpan>{userInfo.followingCount}</FollowingCntSpan>
          <FollowingCntP>followings</FollowingCntP>
        </Link>
      </InformationTopDiv>
      <InformationDiv>
        <InfoNameP>{userInfo.username}</InfoNameP>
        <InfoIdP>@ {userInfo.accountname}</InfoIdP>
        <InfoTextP>{userInfo.intro}</InfoTextP>
      </InformationDiv>
      <ProfileBtn type={type} yourAccountname={userInfo.accountname} />
    </>
  );
}
