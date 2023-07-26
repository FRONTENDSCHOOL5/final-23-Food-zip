import styled from "styled-components";
import { Link } from "react-router-dom";

const NavWrapper = styled.nav`
  position: fixed;
  max-width: 390px;

  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  border-top: 1px solid #dbdbdb;
`;

const NavList = styled.ul`
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
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
`;

export { NavWrapper, NavList, NavLink, StyledNavText };
