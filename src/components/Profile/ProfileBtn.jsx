import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import IconMessage from "../../assets/images/icon-message-circle.svg";
import IconShare from "../../assets/images/icon-share.svg";
import Button from "../common/Button/Button";
import { ButtonStyle } from "../common/Button/Button";

const FlexCommon = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InformationBottomSection = styled.section`
  ${FlexCommon};
  padding-bottom: 26px;
  border-bottom: 1px solid #dbdbdb;
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

const FollowBtn = styled(ButtonStyle)`
  margin: 0 10px;
`;

const AddBtn = styled(ButtonStyle)`
  width: 100px;
  margin-left: 12px;
`;

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
      const res = await axios.post(
        `https://api.mandarin.weniv.co.kr/profile/${yourAccountname}/follow`,
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
        `https://api.mandarin.weniv.co.kr/profile/${yourAccountname}/unfollow`,
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
