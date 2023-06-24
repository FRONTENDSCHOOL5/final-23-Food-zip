import React from "react";
import styled from "styled-components";
import foodzim from "../../assets/images/basic-profile-lg.svg";
import bear from "../../assets/images/chattest.jpg";
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
      username: "푸짐가게",
      chatContent: "안됩니다",
      date: "2023.06.09",
    },
    {
      id: 2,
      profileImg: foodzim,
      username: "채팅",
      chatContent: "너 채팅칠 줄 알아?",
      date: "2023.06.13",
    },
    {
      id: 3,
      profileImg: bear,
      username: "곰돌",
      chatContent: "나는 곰돌이다",
      date: "2023.06.14",
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
