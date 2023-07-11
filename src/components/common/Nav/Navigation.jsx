import React from "react";
import styled from "styled-components";
import { useLocation, Link } from "react-router-dom";
import homeIcon from "../../../assets/images/icon-home.svg";
import editIcon from "../../../assets/images/icon-edit.svg";
import fillHomeIcon from "../../../assets/images/icon-home-fill.svg";
import messageIcon from "../../../assets/images/icon-message-circle.svg";
import fillMessageIcon from "../../../assets/images/icon-message-circle-fill.svg";
import userIcon from "../../../assets/images/icon-user.svg";
import fillUserIcon from "../../../assets/images/icon-user-fill.svg";

const NavWrapper = styled.footer`
  position: fixed;
  max-width: 390px;
  height: 60px;
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid #dbdbdb;
`;

const NavLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #767676;

  &.active {
    color: #286140;
  }
`;

const StyledNavText = styled.p`
  margin-top: 4px;
  font-size: 10px;
  white-space: nowrap;
`;

export default function Navigation() {
  const location = useLocation();

  return (
    <NavWrapper>
      <NavLink
        to="/home"
        className={`nav-link ${location.pathname === "/home" ? "active" : ""}`}
      >
        <img
          src={location.pathname === "/home" ? fillHomeIcon : homeIcon}
          alt="홈"
        />
        <StyledNavText>홈</StyledNavText>
      </NavLink>
      <NavLink
        to="/chat"
        className={`nav-link ${location.pathname === "/chat" ? "active" : ""}`}
      >
        <img
          src={location.pathname === "/chat" ? fillMessageIcon : messageIcon}
          alt="채팅"
          width="24px"
        />
        <StyledNavText>채팅</StyledNavText>
      </NavLink>
      <NavLink
        to="/makepost"
        className={`nav-link ${
          location.pathname === "/makepost" ? "active" : ""
        }`}
      >
        <img src={editIcon} alt="게시물 작성" />
        <StyledNavText>게시물 작성</StyledNavText>
      </NavLink>
      <NavLink
        to="/myprofile"
        className={`nav-link ${
          location.pathname === "/myprofile" ? "active" : ""
        }`}
      >
        <img
          src={location.pathname === "/myprofile" ? fillUserIcon : userIcon}
          alt="프로필"
        />
        <StyledNavText>프로필</StyledNavText>
      </NavLink>
    </NavWrapper>
  );
}
