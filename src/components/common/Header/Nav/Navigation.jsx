import React, { useState } from "react";
import styled from "styled-components";
import homeIcon from "../../../../assets/images/icon-home.svg";
import editIcon from "../../../../assets/images/icon-edit.svg";
import fillHomeIcon from "../../../../assets/images/icon-home-fill.svg";
import messageIcon from "../../../../assets/images/icon-message-circle.svg";
import fillMessageIcon from "../../../../assets/images/icon-message-circle-fill.svg";
import userIcon from "../../../../assets/images/icon-user.svg";
import fillUserIcon from "../../../../assets/images/icon-user-fill.svg";

const NavWrapper = styled.div`
  position: fixed;
  height: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
`;

const NavLink = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #767676;
  &.active {
    color: #286140;
  }
`;

const NavText = styled.p`
  margin-top: 4px;
  font-size: 10px;
  white-space: nowrap;
`;

export default function Navigation() {
  const [activeBtn, setActiveBtn] = useState(null);

  const handleClick = (click, event) => {
    event.preventDefault();
    setActiveBtn(click);
  };

  return (
    <NavWrapper>
      <NavLink
        href="/home"
        className={activeBtn === "/chat" && "active"}
        onClick={event => handleClick("/home", event)}
      >
        <img src={activeBtn === "/home" ? fillHomeIcon : homeIcon} alt="홈" />
        <NavText>홈</NavText>
      </NavLink>
      <NavLink
        href="/chat"
        className={activeBtn === "/chat" ? "active" : ""}
        onClick={event => handleClick("/chat", event)}
      >
        <img
          src={activeBtn === "/chat" ? fillMessageIcon : messageIcon}
          alt="채팅"
          width="24px"
        />
        <NavText>채팅</NavText>
      </NavLink>
      <NavLink
        href="/post"
        className={activeBtn === "/post" ? "active" : ""}
        onClick={event => handleClick("/post", event)}
      >
        <img src={editIcon} alt="게시물 작성" />
        <NavText>게시물 작성</NavText>
      </NavLink>
      <NavLink
        href="/profile"
        className={activeBtn === "/profile" ? "active" : ""}
        onClick={event => handleClick("/profile", event)}
      >
        <img
          src={activeBtn === "/profile" ? fillUserIcon : userIcon}
          alt="프로필"
        />
        <NavText>프로필</NavText>
      </NavLink>
    </NavWrapper>
  );
}
