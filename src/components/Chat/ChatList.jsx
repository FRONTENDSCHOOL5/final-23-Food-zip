import React from "react";
import styled from "styled-components";
import foodzim from "../../assets/images/basic-profile-lg.svg";

const ChatWrapper = styled.ul`
  padding: 0;
`;

const List = styled.li`
  list-style: none;

  display: flex;
  padding: 8px 16px;
  gap: 12px;
  align-items: flex-start;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const ProfileImg = styled.img`
  width: 42px;
  border-radius: 50%;
  position: relative;
`;

const ProfileDot = styled.span`
  content: "";
  position: absolute;
  top: 10px;
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
`;

export default function ChatList() {
  return (
    <ChatWrapper>
      <List>
        <ProfileImg src={foodzim} alt="프로필 이미지" />
        <ProfileDot />
        <TextWrap>
          <UserName>애월읍 위니브 감귤농장</UserName>
          <ChatContent>채팅이다</ChatContent>
        </TextWrap>
        <Date>2023.06.09</Date>
      </List>
    </ChatWrapper>
  );
}
