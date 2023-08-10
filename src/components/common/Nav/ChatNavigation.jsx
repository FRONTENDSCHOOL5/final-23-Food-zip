import React from "react";
import imageIcon from "../../../assets/images/img-button.svg";
import { ChatNavBar, ImageIcon, Input, SendBtn } from "./ChatNavigationStyle";
// import sprite from "../../../assets/images/SpriteIcon.svg";

export default function ChatNavigation({
  inputValue,
  handleInputChange,
  handleButtonClicked,
}) {
  // const SocialSVG = ({ id, color = "white", size = 24 }) => (
  //   <svg fill={color} width={size} height={size}>
  //     <use href={`${sprite}#${id}`} style={{ stroke: "currentColor" }} />
  //   </svg>
  // );
  return (
    <ChatNavBar>
      <ImageIcon src={imageIcon} alt="사진 선택하기" />
      {/* <SocialSVG id="icon-more-vertical" /> */}
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
