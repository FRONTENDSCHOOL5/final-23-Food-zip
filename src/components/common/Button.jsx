import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  display: block;
  width: 322px;
  font-size: 14px;
  line-height: 17.53px;
  background: #629678;
  color: #fff;
  border-radius: 44px;
  padding: 13px 100px;
`;

export default function Button(props) {
  return (
    <StyledButton className={`${props.className}`} onClick={props.onClick}>
      {props.content}
    </StyledButton>
  );
}
