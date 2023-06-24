import React from "react";
import styled from "styled-components";
import foodzim from "../../assets/images/basic-profile-lg.svg";
import forkfoodzim from "../../assets/images/fork-profile-lg.svg";
import likelion from "../../assets/images/likelion.svg";
import { useNavigate } from "react-router-dom";

const ChatWrapper = styled.ul`
  padding: 0;
`;

const List = styled.li`
  list-style: none;
  display: flex;
  padding: 8px 16px;
  gap: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: white;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const ProfileImg = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  position: relative;
`;

const ProfileDot = styled.span`
  content: "";
  position: absolute;
  top: 60px;
  width: 12px;
  height: 12px;
  background-color: #286140;
  border-radius: 50%;
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 5px;
`;

const UserName = styled.strong`
  font-size: 14px;
`;

const ChatContent = styled.p`
  margin: 0;
  font-size: 12px;
  color: #767676;
`;

const Date = styled.p`
  font-size: 10px;
  color: #dbdbdb;
  margin-left: auto;
  margin-top: auto;
`;

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
    navigate("/chatroom");
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
