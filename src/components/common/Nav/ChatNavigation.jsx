import React from "react";
import imageIcon from "../../../assets/images/img-button.svg";
import { ChatNavBar, ImageIcon, Input, SendBtn } from "./ChatNavigationStyle";
export default function ChatNavigation({
  inputValue,
  handleInputChange,
  handleButtonClicked,
}) {
  return (
    <ChatNavBar>
      <ImageIcon src={imageIcon} alt="사진 선택하기" />
      <Input
        type="text"
        placeholder="메시지 입력하기.."
        value={inputValue}
        onChange={handleInputChange}
      />
      <SendBtn
        hasText={inputValue.trim().length > 0}
        onClick={handleButtonClicked}
      >
        전송
      </SendBtn>
    </ChatNavBar>
  );
}
