import React from "react";
import {
  ChatWrapper,
  List,
  ProfileImg,
  ProfileDot,
  TextWrap,
  UserName,
  ChatContent,
  Date,
} from "./ChatListItemStyle";
import foodzim from "../../assets/images/basic-profile-lg.svg";
import forkfoodzim from "../../assets/images/fork-profile-lg.svg";
import likelion from "../../assets/images/likelion.svg";
import { useNavigate } from "react-router-dom";

export default function ChatListItem() {
  const chatListData = [
    {
      id: 1,
      profileImg: foodzim,
      username: "푸짐이",
      chatContent: "다음에 기회 되면 푸짐님도 같이 가요!",
      date: "2023.06.28",
    },
    {
      id: 2,
      profileImg: forkfoodzim,
      username: "포크푸짐이",
      chatContent: "밥 먹자 ㅠㅠ 배고파",
      date: "2023.06.28",
    },
    {
      id: 3,
      profileImg: likelion,
      username: "멋쟁이사자처럼",
      chatContent: "선릉역에 맛집 추천해 주세요!",
      date: "2023.06.27",
    },
  ];
  const navigate = useNavigate();
  function handleClick() {
    navigate("/chatroom/example");
  }
  return (
    <ChatWrapper>
      {chatListData.map(chatItem => (
        <List key={chatItem.id} onClick={handleClick}>
          <ProfileImg src={chatItem.profileImg} alt="프로필 이미지" />
          <ProfileDot />
          <TextWrap>
            <UserName>{chatItem.username}</UserName>
            <ChatContent>{chatItem.chatContent}</ChatContent>
          </TextWrap>
          <Date>{chatItem.date}</Date>
        </List>
      ))}
    </ChatWrapper>
  );
}
