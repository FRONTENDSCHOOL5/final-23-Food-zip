import errorIcon from "../../assets/images/icon-404.svg";
import Button from "../common/Button/Button";
import { useNavigate } from "react-router-dom";
import { ErrorWrapper, ErrorImg, ErrorText } from "./ErrorStyle";
export default function Error() {
  const navigate = useNavigate();
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
        onClick={() => navigate(-1)}
      />
    </ErrorWrapper>
  );
}
