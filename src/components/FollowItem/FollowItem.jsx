import React from "react";
// import ProfileImg from "../../assets/profile-img-test.png";
import ProfileImg from "../../assets/images/list-example.png";
import styled from "styled-components";
const Container = styled.div`
  width: 358px;
  display: flex;
  align-items: center;
`;
const FollowerImgTest = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 12px;
`;
const FollowerInfo = styled.div`
  padding: 5px 0;
  width: 228px;
`;
const FollowerName = styled.p`
  font-size: 14px;
  margin-bottom: 6px;
`;
const FollowerIntro = styled.p`
  font-size: 12px;
  color: #767676;
`;
const BtnFollow = styled.button`
  width: 56px;
  padding: 7px 11px;
  background: #286140;
  font-size: 12px;
  color: #fff;
  border-radius: 26px;
`;
const BtnUnFollow = styled.button`
  width: 56px;
  padding: 7px 11px;
  background: #fff;
  font-size: 12px;
  color: #767676;
  border: 1px solid #dbdbdb;
  border-radius: 26px;
`;
export default function FollowItem() {
  return (
    <Container>
      <FollowerImgTest src={ProfileImg} alt="프로필 이미지" />
      <FollowerInfo>
        <FollowerName>애월읍 한라봉 최고 맛집</FollowerName>
        <FollowerIntro>정성을 다해 농사짓는 한라봉</FollowerIntro>
      </FollowerInfo>
      {/* <BtnFollow>팔로우</BtnFollow> */}
      <BtnUnFollow>취소</BtnUnFollow>
    </Container>
  );
}
