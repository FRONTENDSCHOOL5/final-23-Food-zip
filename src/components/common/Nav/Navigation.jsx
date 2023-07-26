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
import ProfileIcon from "../../../assets/images/ProfileIcon";
import HomeIcon from "../../../assets/images/HomeIcon";
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
            {/* <img
              src={location.pathname === "/home" ? fillHomeIcon : homeIcon}
              alt="홈"
            /> */}
            <HomeIcon
              fillColor={
                location.pathname === "/home" ? "rgb(40, 97, 64)" : "none"
              }
              strokeColor={
                location.pathname === "/home" ? "rgb(40, 97, 64)" : undefined
              }
              fillColor1={location.pathname === "/home" ? "#fff" : "none"}
              alt="프로필"
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
            {/* <img
              src={
                location.pathname === "/myprofile" ? "rgb(40, 97, 64)" : "none"
              }
              alt="프로필"
            /> */}
            <ProfileIcon
              fillColor={
                location.pathname === "/myprofile" ? "rgb(40, 97, 64)" : "none"
              }
              strokeColor={
                location.pathname === "/myprofile"
                  ? "rgb(40, 97, 64)"
                  : undefined
              }
              alt="프로필"
            />
            <StyledNavText>프로필</StyledNavText>
          </NavLink>
        </li>
      </NavList>
    </NavWrapper>
  );
}
