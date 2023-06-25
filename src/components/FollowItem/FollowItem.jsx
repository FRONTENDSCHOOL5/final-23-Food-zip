import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../common/Button/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  object-fit: cover;
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

export default function FollowItem({
  username,
  intro,
  image,
  accountname,
  isfollow,
}) {
  const [follow, setFollow] = useState(isfollow);
  const myaccountname = localStorage.getItem("accountname");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  function moveProfile(accountname) {
    navigate(`/profile/${accountname}`, {
      state: {
        accountname: accountname,
      },
    });
  }
  // useEffect(() => {}, [follow, setFollow]);

  const toggleFollow = async () => {
    try {
      // 팔로우 상태에 따라 API 요청을 다르게 수행
      if (!follow) {
        await axios.post(
          `https://api.mandarin.weniv.co.kr/profile/${accountname}/follow`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-type": "application/json",
            },
          },
        );
      } else {
        await axios.delete(
          `https://api.mandarin.weniv.co.kr/profile/${accountname}/unfollow`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-type": "application/json",
            },
          },
        );
      }

      setFollow(!follow);
    } catch (err) {
      console.error("에러!", err);
      navigate("/error");
    }
  };

  return (
    <Container>
      <FollowerImgTest
        src={image}
        alt="프로필 이미지"
        onClick={() => moveProfile(accountname)}
      />
      <FollowerInfo onClick={() => moveProfile(accountname)}>
        <FollowerName>{username}</FollowerName>
        <FollowerIntro>{intro}</FollowerIntro>
      </FollowerInfo>
      {accountname !== myaccountname && (
        <Button
          type="button"
          content={follow ? "취소" : "팔로우"}
          width="s"
          size="s"
          bgColor={!follow ? "active" : ""}
          border={follow ? "active" : ""}
          color={follow ? "active" : ""}
          onClick={toggleFollow}
        />
      )}
    </Container>
  );
}
