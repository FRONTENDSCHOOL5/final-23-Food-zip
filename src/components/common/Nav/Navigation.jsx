import React from "react";
import { useLocation } from "react-router-dom";
import { NavWrapper, NavList, NavLink, StyledNavText } from "./NavigationStyle";
import sprite from "../../../assets/images/SpriteIcon.svg";

export default function Navigation() {
  const location = useLocation();
  const SocialSVG = ({ id, color = "white", size = 24 }) => (
    <svg fill={color} width={size} height={size}>
      <use href={`${sprite}#${id}`} style={{ stroke: "currentColor" }} />
    </svg>
  );

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
            <SocialSVG
              id={
                location.pathname === "/home" ? "icon-home-fill" : "icon-home"
              }
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
            <SocialSVG
              id="icon-message-circle"
              color={location.pathname === "/chat" ? "#286140" : "white"}
              strokeColor={
                location.pathname === "/chat" ? "#286140" : undefined
              }
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
            <SocialSVG id="icon-edit" />
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
            <SocialSVG
              id="icon-user"
              color={location.pathname === "/myprofile" ? "#286140" : "white"}
              strokeColor={
                location.pathname === "/myprofile" ? "#286140" : undefined
              }
            />
            <StyledNavText>프로필</StyledNavText>
          </NavLink>
        </li>
      </NavList>
    </NavWrapper>
  );
}
