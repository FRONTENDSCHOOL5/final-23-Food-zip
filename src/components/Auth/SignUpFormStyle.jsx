import { ButtonStyle } from "../common/Button/Button";
import styled from "styled-components";

const StyledForm = styled.form`
  margin-top: 40px;
  height: 100%;
`;
const StyledButton = styled(ButtonStyle)`
  margin: 50px auto 20px;
`;
const StyledLabel = styled.label`
  display: block;
  text-align: left;
  padding: 0 35px;
  font-size: 16px;
  color: #767676;
  pointer-events: none;
`;
const StyledInput = styled.input`
  display: block;
  width: 322px;
  box-sizing: border-box;
  border: none;
  box-shadow: 0 1px 0 0 #677880;
  height: 46px;
  border-radius: 4px 4px 0 0;
  padding-top: 8px;
  font-size: 14px;
  margin: 0 auto 36px auto;
  outline: none;
  background: transparent;
  &::placeholder {
    color: #dbdbdb;
  }
  &:focus {
    outline: none;
    border-bottom: 1px solid #286140;
  }
`;
const StyledInputContainerDiv = styled.div`
  position: relative;
`;
const StyledError = styled.small`
  font-size: 12px;
  color: red;
  position: absolute;
  bottom: -18px;
  left: 35px;
`;
export {
  StyledButton,
  StyledError,
  StyledForm,
  StyledInput,
  StyledInputContainerDiv,
  StyledLabel,
};
