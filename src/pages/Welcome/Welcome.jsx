import React from "react";
import Logo from "../../assets/images/symbol-logo-white.svg";
import {
  Container,
  LogoImg,
  LoginBox,
  KakaoLogin,
  GoogleLogin,
  FacebookLogin,
  EmailLogin,
  Join,
  LoginJoinBox,
  Divider,
} from "./WelcomeStyle";
export default function Welcome() {
  return (
    <Container>
      <LogoImg src={Logo} alt="로고" />
      <LoginBox>
        <KakaoLogin>카카오톡 계정으로 로그인</KakaoLogin>
        <GoogleLogin>구글 계정으로 로그인</GoogleLogin>
        <FacebookLogin>페이스북 계정으로 로그인</FacebookLogin>
        <LoginJoinBox>
          <EmailLogin to="/login">이메일로 로그인</EmailLogin>
          <Divider></Divider>
          <Join to="/signup">회원가입</Join>
        </LoginJoinBox>
      </LoginBox>
    </Container>
  );
}
