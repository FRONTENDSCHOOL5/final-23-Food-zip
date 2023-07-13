import React from "react";
import foodzim from "../../assets/images/basic-profile-lg.svg";
import {
  MessageWrap,
  ProfileImg,
  MessageText,
  TimeStamp,
} from "./ReceiveMessageStyle";

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
