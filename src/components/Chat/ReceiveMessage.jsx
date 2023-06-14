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
      messageText:
        "대한민국의 주권은 국민에게 있고, 모든 권력은 국민으로부터 나온다. 모든 국민은 학문과 예술의 자유를 가진다. 이 헌법시행 당시의 법령과 조약은 이 헌법에 위배되지 아니하는 한 그 효력을 지속한다.",
      time: "12.39",
    },
    {
      id: 2,
      messageText: "집 가고 싶다",
      time: "13.45",
    },
    {
      id: 3,
      messageText: "밥 먹으러 가도 되나요?",
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
