import grayLogo from "../../assets/images/symbol-logo-gray.svg";
import Button from "../common/Button/Button";
import { useNavigate } from "react-router-dom";
import { EmptyWrapper, EmptyImg, EmptyText } from "./EmptyHomeStyle";
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
