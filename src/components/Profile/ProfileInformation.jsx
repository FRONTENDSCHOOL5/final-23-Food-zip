import React from "react";
import styled, { css } from "styled-components";
import Header from "../Header/Header";
import ProfileImage from "../../assets/images/basic-profile-lg.svg";
import IconMessage from "../../assets/images/icon-message-circle.svg";
import IconShare from "../../assets/images/icon-share.svg";

const ProfileInfoWrapDiv = styled.div`
  width: 390px;
  padding: 78px 55px 26px;
  box-sizing: border-box;
  margin-bottom: 6px;
  background-color: white;
  box-shadow: inset 0 0 0 1px orange;
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

const FlexCommon = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InformationBottomDiv = styled.div`
  ${FlexCommon}
`;

const BtnCommon = css`
  width: 120px;
  height: 34px;
  font-size: 14px;
  border-radius: 30px;
`;

const FollowBtn = styled.button`
  ${BtnCommon}
  color: white;
  background-color: #f26e22;
  border: 0;
  margin: 0 10px;
`;

const BasicBtn = styled.button`
  ${BtnCommon}
  width: ${({ add }) => (add ? "100px" : "120px")};
  color: #767676;
  background-color: white;
  border: 1px solid #dbdbdb;
`;

const ImgCircleBtn = styled.button`
  width: 34px;
  height: 34px;
  border: 1px solid #dbdbdb;
  background-color: transparent;
  border-radius: 50%;
  box-sizing: border-box;
  ${FlexCommon}
`;

export default function Profile() {
  return (
    <div>
      <Header type="profile" />
      <ProfileInfoWrapDiv>
        <InformationTopDiv>
          <div>
            <FollowerCntSpan>2950</FollowerCntSpan>
            <FollowerCntP>followers</FollowerCntP>
          </div>
          <img src={ProfileImage} alt="프로필 이미지" />
          <div>
            <FollowingCntSpan>128</FollowingCntSpan>
            <FollowingCntP>followings</FollowingCntP>
          </div>
        </InformationTopDiv>
        <InformationDiv>
          <InfoNameP>애월읍 위니브 감귤농장</InfoNameP>
          <InfoIdP>@ weniv_Mandarin</InfoIdP>
          <InfoTextP>애월읍 감귤 전국 배송, 귤따기 체험, 감귤 농장</InfoTextP>
        </InformationDiv>
        <InformationBottomDiv>
          <ImgCircleBtn>
            <img src={IconMessage} alt="메시지 아이콘" />
          </ImgCircleBtn>
          <FollowBtn>팔로우</FollowBtn>
          <ImgCircleBtn>
            <img src={IconShare} alt="공유 아이콘" />
          </ImgCircleBtn>
        </InformationBottomDiv>
      </ProfileInfoWrapDiv>
      {/* <BasicBtn>언팔로우</BasicBtn>
      <BasicBtn>프로필 수정</BasicBtn>
      <BasicBtn add>맛집 등록</BasicBtn> */}
    </div>
  );
}
