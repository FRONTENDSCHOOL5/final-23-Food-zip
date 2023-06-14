import React, { useEffect, useState } from "react";
import styled from "styled-components";
import homeIcon from "../../../assets/images/icon-home.svg";
import editIcon from "../../../assets/images/icon-edit.svg";
import fillHomeIcon from "../../../assets/images/icon-home-fill.svg";
import messageIcon from "../../../assets/images/icon-message-circle.svg";
import fillMessageIcon from "../../../assets/images/icon-message-circle-fill.svg";
import userIcon from "../../../assets/images/icon-user.svg";
import fillUserIcon from "../../../assets/images/icon-user-fill.svg";
import { Link } from "react-router-dom";
const NavWrapper = styled.div`
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
`;

const StyledNavText = styled.p`
  margin-top: 4px;
  font-size: 10px;
  white-space: nowrap;
`;

export default function Navigation() {
  const [activeBtn, setActiveBtn] = useState("");

  const handleClick = btnNumber => {
    setActiveBtn(btnNumber);
  };

  useEffect(() => {
    console.log(activeBtn);
  }, [activeBtn]);
  return (
    <NavWrapper>
      <NavLink to="/home" className="nav-link" onClick={() => handleClick(1)}>
        <img src={activeBtn === 1 ? fillHomeIcon : homeIcon} alt="홈" />
        <StyledNavText>홈</StyledNavText>
      </NavLink>
      <NavLink to="/chat" className="nav-link" onClick={() => handleClick(2)}>
        <img
          src={activeBtn === 2 ? fillMessageIcon : messageIcon}
          alt="채팅"
          width="24px"
        />
        <StyledNavText>채팅</StyledNavText>
      </NavLink>
      <NavLink
        to="/makepost"
        className="nav-link"
        onClick={() => setActiveBtn(3)}
      >
        <img src={editIcon} alt="게시물 작성" />
        <StyledNavText>게시물 작성</StyledNavText>
      </NavLink>
      <NavLink to="/search" className="nav-link" onClick={() => handleClick(4)}>
        <img src={activeBtn === 4 ? fillUserIcon : userIcon} alt="프로필" />
        <StyledNavText>프로필</StyledNavText>
      </NavLink>
    </NavWrapper>
  );
}
