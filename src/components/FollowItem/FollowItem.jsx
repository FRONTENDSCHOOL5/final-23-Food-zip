import React, { useState } from "react";
import ProfileImg from "../../assets/images/list-example.png";
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

export default function FollowItem({ username, intro, image, accountname }) {
  const [follow, setFollow] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  function moveProfile(accountname) {
    navigate(`/profile/${accountname}`, {
      state: {
        accountname: accountname,
      },
    });
  }

  const Follow = async () => {
    try {
      const tokenValid = await axios.get(
        `https://api.mandarin.weniv.co.kr/user/checktoken`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        },
      );
      const res = await axios.post(
        `https://api.mandarin.weniv.co.kr/profile/${accountname}/follow`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        },
      );
      setFollow(!follow);
    } catch (err) {
      console.error("에러!", err);
      navigate("/error");
    }
  };

  const UnFollow = async () => {
    try {
      const res = await axios.delete(
        `https://api.mandarin.weniv.co.kr/profile/${accountname}/unfollow`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        },
      );
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
      {!follow ? (
        <Button
          type="button"
          content="팔로우"
          width="s"
          size="s"
          bgColor="active"
          onClick={Follow}
        />
      ) : (
        <Button
          type="button"
          content="취소"
          width="s"
          size="s"
          border="active"
          color="active"
          onClick={UnFollow}
        />
      )}
    </Container>
  );
}
