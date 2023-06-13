import React from "react";
import styled, { css } from "styled-components";
import ProfileImage from "../../assets/images/basic-profile-lg.svg";
import ProfileBtn from "./ProfileBtn";
import Header from "../common/Header/Header";

const ProfileInfoWrapDiv = styled.div`
  width: 100%;
  padding: 78px 55px 26px;
  box-sizing: border-box;
  margin-bottom: 6px;
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

const InformationDiv = styled.p`
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

export default function ProfileInformation({ type }) {
  return (
    <>
      <Header type="profile" />
      <ProfileInfoWrapDiv>
        <InformationTopDiv>
          <a href="#!">
            <FollowerCntSpan>2950</FollowerCntSpan>
            <FollowerCntP>followers</FollowerCntP>
          </a>
          <img src={ProfileImage} alt="프로필 이미지" />
          <a href="#!">
            <FollowingCntSpan>128</FollowingCntSpan>
            <FollowingCntP>followings</FollowingCntP>
          </a>
        </InformationTopDiv>
        <InformationDiv>
          <InfoNameP>애월읍 위니브 감귤농장</InfoNameP>
          <InfoIdP>@ weniv_Mandarin</InfoIdP>
          <InfoTextP>애월읍 감귤 전국 배송, 귤따기 체험, 감귤 농장</InfoTextP>
        </InformationDiv>
        <ProfileBtn type={type} />
      </ProfileInfoWrapDiv>
    </>
  );
}
