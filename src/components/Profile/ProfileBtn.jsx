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

const InformationBottomDiv = styled.div`
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

export default function ProfileBtn({ type }) {
  const navigate = useNavigate();
  function moveProfileEdit() {
    console.log(true);
    navigate("/myprofile/edit");
  }
  function moveRecommend() {
    console.log(true);
    navigate("/makerecommend");
  }
  function moveChat() {
    navigate("/chatroom");
    console.log("move");
  }

  const UI = {
    your: (
      <>
        <InformationBottomDiv>
          <ImgCircleBtn type="button" onClick={moveChat}>
            <img src={IconMessage} alt="메시지 아이콘" />
          </ImgCircleBtn>
          <FollowBtn type="button" size="m" width="m" bgColor="active">
            팔로우
          </FollowBtn>
          <ImgCircleBtn>
            <img src={IconShare} alt="공유 아이콘" />
          </ImgCircleBtn>
        </InformationBottomDiv>
      </>
    ),

    my: (
      <InformationBottomDiv>
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
      </InformationBottomDiv>
    ),
  };

  return UI[type];
}
