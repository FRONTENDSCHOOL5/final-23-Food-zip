import styled from "styled-components";
import grayLogo from "../../assets/images/symbol-logo-gray.svg";

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
const EmptyBtn = styled.button`
  padding: 13px 25px;
  background-color: #286140;
  color: white;
  border: none;
  border-radius: 44px;
  font-size: 14px;
`;

export default function EmptyHome() {
  return (
    <EmptyWrapper>
      <EmptyImg src={grayLogo} alt="로고이미지" />
      <EmptyText>유저를 검색해 팔로우 해보세요!</EmptyText>
      <EmptyBtn>검색하기</EmptyBtn>
    </EmptyWrapper>
  );
}
