import React from "react";
import styled from "styled-components";

const ButtonStyle = styled.button`
  display: block;
  border-radius: 20px;
  width: ${props =>
    props.width === "s"
      ? "56px"
      : props.width === "ms"
      ? "90px"
      : props.width === "m"
      ? "120px"
      : "322px"};
  padding: ${props =>
    props.size === "s"
      ? "7px 0px"
      : props.size === "ms"
      ? "8px 0px"
      : props.size === "m"
      ? "9px 0px"
      : "13px 0px"};
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
  width,
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
      width={width}
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
