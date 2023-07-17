import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { followApi, unfollowApi } from "../../../api/follow";
import IconMessage from "../../../assets/images/icon-message-circle.svg";
import IconShare from "../../../assets/images/icon-share.svg";
import Button from "../../../components/common/Button/Button";
import {
  InformationBottomSection,
  ImgCircleBtn,
  FollowBtn,
  AddBtn,
} from "./ProfileBtnStyle";

export default function ProfileBtn({
  type,
  yourAccountname,
  setFollow,
  follow,
}) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function moveProfileEdit() {
    navigate("/myprofile/edit");
  }

  function moveRecommend() {
    navigate("/makerecommend");
  }

  function moveChat(yourAccountname) {
    navigate(`/chatroom/${yourAccountname}`, {
      state: {
        yourAccountname: yourAccountname,
      },
    });
  }

  const Follow = async () => {
    try {
      await followApi(yourAccountname, token);
      setFollow(!follow);
    } catch (err) {
      console.error("에러!", err);
      navigate("/error");
    }
  };

  const UnFollow = async () => {
    try {
      await unfollowApi(yourAccountname, token);
      setFollow(!follow);
    } catch (err) {
      console.error("에러!", err);
      navigate("/error");
    }
  };

  const UI = {
    your: (
      <>
        <InformationBottomSection>
          <ImgCircleBtn type="button" onClick={() => moveChat(yourAccountname)}>
            <img src={IconMessage} alt="메시지 아이콘" />
          </ImgCircleBtn>
          {follow ? (
            <FollowBtn
              type="button"
              size="m"
              width="m"
              bgColor="active"
              onClick={Follow}
            >
              팔로우
            </FollowBtn>
          ) : (
            <FollowBtn
              type="button"
              size="ms"
              width="m"
              border="active"
              color="active"
              onClick={UnFollow}
            >
              언팔로우
            </FollowBtn>
          )}

          <ImgCircleBtn>
            <img src={IconShare} alt="공유 아이콘" />
          </ImgCircleBtn>
        </InformationBottomSection>
      </>
    ),

    my: (
      <InformationBottomSection>
        <Button
          type="button"
          content="프로필 수정"
          size="m"
          width="m"
          border="active"
          color="active"
          onClick={moveProfileEdit}
        ></Button>
        <AddBtn
          type="button"
          size="m"
          border="active"
          color="active"
          onClick={moveRecommend}
        >
          맛집 등록
        </AddBtn>
      </InformationBottomSection>
    ),
  };

  return UI[type];
}
