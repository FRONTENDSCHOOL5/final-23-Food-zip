import React, { useState } from "react";
import Button from "../common/Button/Button";
import { useNavigate } from "react-router-dom";
import { followApi, unfollowApi } from "../../api/follow";
import {
  Container,
  FollowerImgTest,
  FollowerInfo,
  FollowerName,
  FollowerIntro,
} from "./FollowItemStyle";

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

  const toggleFollow = async () => {
    try {
      if (!follow) {
        await followApi(accountname, token);
      } else {
        await unfollowApi(accountname, token);
      }
      setFollow(!follow);
    } catch (err) {
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
