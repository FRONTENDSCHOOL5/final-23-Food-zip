import styled, { css } from "styled-components";
import { ButtonStyle } from "../../common/Button/Button";

const FlexCommon = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InformationBottomSection = styled.section`
  ${FlexCommon};
  padding-bottom: 26px;
  border-bottom: 1px solid #dbdbdb;
`;

const ImgCircleBtn = styled.button`
  width: 34px;
  height: 34px;
  border: 1px solid #dbdbdb;
  background-color: transparent;
  border-radius: 50%;
  box-sizing: border-box;
  ${FlexCommon}
`;

const FollowBtn = styled(ButtonStyle)`
  margin: 0 10px;
`;

const AddBtn = styled(ButtonStyle)`
  width: 100px;
  margin-left: 12px;
`;

export { InformationBottomSection, ImgCircleBtn, FollowBtn, AddBtn };
