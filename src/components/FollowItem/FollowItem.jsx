import React, { useState } from "react";
import ProfileImg from "../../assets/images/list-example.png";
import styled from "styled-components";
import Button from "../common/Button/Button";
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

export default function FollowItem() {
  const [follow, setFollow] = useState(true);
  const FollowBtn = () => {
    setFollow(!follow);
  };
  const UnFollowBtn = () => {
    setFollow(!follow);
  };

  return (
    <Container>
      <FollowerImgTest src={ProfileImg} alt="프로필 이미지" />
      <FollowerInfo>
        <FollowerName>애월읍 한라봉 최고 맛집</FollowerName>
        <FollowerIntro>정성을 다해 농사짓는 한라봉</FollowerIntro>
      </FollowerInfo>
      {follow ? (
        <Button
          type="button"
          content="팔로우"
          width="s"
          size="s"
          bgColor="active"
          onClick={FollowBtn}
        />
      ) : (
        <Button
          type="button"
          content="취소"
          width="s"
          size="s"
          border="active"
          color="active"
          onClick={UnFollowBtn}
        />
      )}
    </Container>
  );
}
