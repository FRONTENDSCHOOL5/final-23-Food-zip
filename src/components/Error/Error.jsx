import styled from "styled-components";
import errorIcon from "../../assets/images/icon-404.svg";
import Button from "../common/Button/Button";
const ErrorWrapper = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
`;
const ErrorImg = styled.img`
  margin: -70px 0 -10px 0;
  width: 150px;
`;
const ErrorText = styled.h2`
  margin: 0px;
  font-weight: 400;
  font-size: 14px;
  color: #767676;
`;

export default function Error() {
  return (
    <ErrorWrapper>
      <ErrorImg src={errorIcon} alt="404페이지" />
      <ErrorText>페이지를 찾을 수 없습니다.:&#40;</ErrorText>
      <Button
        type="button"
        content="이전 페이지"
        size="l"
        width="m"
        bgColor="active"
        color="#fff"
        border="null"
        // onClick={handleClick}
      />
    </ErrorWrapper>
  );
}
