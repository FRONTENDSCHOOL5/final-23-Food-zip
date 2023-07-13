import React from "react";
import { useLocation } from "react-router-dom";
import homeIcon from "../../../assets/images/icon-home.svg";
import editIcon from "../../../assets/images/icon-edit.svg";
import fillHomeIcon from "../../../assets/images/icon-home-fill.svg";
import messageIcon from "../../../assets/images/icon-message-circle.svg";
import fillMessageIcon from "../../../assets/images/icon-message-circle-fill.svg";
import userIcon from "../../../assets/images/icon-user.svg";
import fillUserIcon from "../../../assets/images/icon-user-fill.svg";
import { NavWrapper, NavList, NavLink, StyledNavText } from "./NavigationStyle";

export default function Navigation() {
  const location = useLocation();

  return (
    <NavWrapper>
      <NavList>
        <li>
          <NavLink
            to="/home"
            className={`nav-link ${
              location.pathname === "/home" ? "active" : ""
            }`}
          >
            <img
              src={location.pathname === "/home" ? fillHomeIcon : homeIcon}
              alt="홈"
            />
            <StyledNavText>홈</StyledNavText>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/chat"
            className={`nav-link ${
              location.pathname === "/chat" ? "active" : ""
            }`}
          >
            <img
              src={
                location.pathname === "/chat" ? fillMessageIcon : messageIcon
              }
              alt="채팅"
              width="24px"
            />
            <StyledNavText>채팅</StyledNavText>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/makepost"
            className={`nav-link ${
              location.pathname === "/makepost" ? "active" : ""
            }`}
          >
            <img src={editIcon} alt="게시물 작성" />
            <StyledNavText>게시물 작성</StyledNavText>
          </NavLink>
        </li>
        <li>
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
        </li>
      </NavList>
    </NavWrapper>
  );
}
