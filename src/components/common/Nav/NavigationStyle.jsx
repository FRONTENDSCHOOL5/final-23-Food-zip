import styled from "styled-components";
import { Link } from "react-router-dom";
const NavWrapper = styled.nav`
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
export { NavWrapper, NavLink, StyledNavText };
