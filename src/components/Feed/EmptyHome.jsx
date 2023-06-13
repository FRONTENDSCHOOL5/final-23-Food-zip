import styled from "styled-components";
import grayLogo from "../../assets/images/symbol-logo-gray.svg";
import Button from "../common/Button/Button";
import { useNavigate } from "react-router-dom";

const EmptyWrapper = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
`;
const EmptyImg = styled.img`
  margin-bottom: 12px;
`;
const EmptyText = styled.h2`
  margin: 0px;
  font-weight: 400;
  font-size: 14px;
  color: #767676;
`;

export default function EmptyHome() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/search");
  }
  return (
    <EmptyWrapper>
      <EmptyImg src={grayLogo} alt="로고이미지" />
      <EmptyText>유저를 검색해 팔로우 해보세요!</EmptyText>
      <Button
        type="button"
        content="검색하기"
        size="l"
        width="m"
        bgColor="active"
        color="#fff"
        border="null"
        onClick={handleClick}
      />
    </EmptyWrapper>
  );
}
