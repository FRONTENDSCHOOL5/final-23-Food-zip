import React from "react";
import styled from "styled-components";
import foodzim from "../../assets/images/basic-profile-lg.svg";

const MessageWrap = styled.li`
  list-style: none;
  display: flex;
  padding: 8px 16px;
  gap: 9px;
  align-items: flex-start;
`;

const ProfileImg = styled.img`
  width: 42px;
  border-radius: 50%;
`;

const MessageText = styled.div`
  max-width: 240px;
  padding: 12px;
  border: 1px solid #c4c4c4;
  border-radius: 0 10px 10px 10px;
  font-size: 14px;
  line-height: 16px;
  position: relative;
  background-color: white;
`;

const TimeStamp = styled.span`
  font-size: 10px;
  color: #767676;
  position: absolute;
  bottom: 0px;
  right: -35px;
`;

export default function ReceiveMessage() {
  const messageList = [
    {
      id: 1,
      messageText: "푸짐님~! 항상 피드 잘 보고 있어요",
      time: "12.39",
    },
    {
      id: 2,
      messageText:
        "저는 저번 주말에 오제제 강남점을 갔는데, 분위기도 좋고 음식도 맛있었어요",
      time: "13.45",
    },
    {
      id: 3,
      messageText: "다음에 기회 되면 푸짐님도 같이 가요!",
      time: "13.45",
    },
  ];

  return (
    <ul>
      {messageList.map(messageItem => (
        <MessageWrap key={messageItem.id}>
          <ProfileImg src={foodzim} alt="사용자 프로필 사진" />
          <MessageText>
            {messageItem.messageText}
            <TimeStamp>{messageItem.time}</TimeStamp>
          </MessageText>
        </MessageWrap>
      ))}
    </ul>
  );
}
