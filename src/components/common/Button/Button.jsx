import React from "react";
import styled from "styled-components";

const ButtonStyle = styled.button`
  display: block;
  border-radius: 20px;
  margin: 10px auto;
  padding: ${props =>
    props.size === "s"
      ? "7px 11px"
      : props.size === "ms"
      ? "8px 32px"
      : props.size === "m"
      ? "8px 42px"
      : "13px 149px"};
  background-color: ${props =>
    props.bgColor === "active"
      ? "#286140"
      : props.bgColor === "inactive"
      ? "#629678"
      : "#fffff"};
  border: ${props => (props.border === "active" ? "1px solid #DBDBDB" : null)};
  color: ${props => (props.color === "active" ? "#767676" : "#ffffff")};
`;
export default function Button({
  type,
  content,
  size,
  bgColor,
  color,
  border,
  disabled,
  onClick,
}) {
  return (
    <ButtonStyle
      type={type ? "button" : "submit"}
      size={size}
      bgColor={bgColor}
      color={color}
      border={border}
      disabled={disabled}
      onClick={onClick}
    >
      {content}
    </ButtonStyle>
  );
}
