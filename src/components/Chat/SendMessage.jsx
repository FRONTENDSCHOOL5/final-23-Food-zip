import { useState } from "react";
import styled from "styled-components";

export const MessageWrap = styled.li`
  list-style: none;
  display: flex;
  padding: 8px 16px;
  gap: 9px;
  align-items: flex-start;
`;

export const MessageText = styled.div`
  max-width: 240px;
  padding: 12px;
  border-radius: 10px 0 10px 10px;
  background-color: #286140;
  color: white;
  font-size: 14px;
  line-height: 16px;
  position: relative;
  margin: 0 16px 0 auto;
`;

export const TimeStamp = styled.span`
  font-size: 10px;
  color: #767676;
  position: absolute;
  bottom: 0px;
  left: -35px;
`;

export default function SendMessage() {
  return (
    <MessageWrap>
      <MessageText>
        네~ 좋아요
        <TimeStamp>13.58</TimeStamp>
      </MessageText>
    </MessageWrap>
  );
}
