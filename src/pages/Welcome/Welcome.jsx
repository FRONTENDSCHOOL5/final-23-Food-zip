import React from "react";
import Logo from "../../assets/images/symbol-logo-white.svg";
import sprite from "../../assets/images/SpriteIcon.svg";

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
  const SocialSVG = ({ id, color = "white", size = 24, margin = 0 }) => (
    <svg fill={color} width={size} height={size}>
      <use href={`${sprite}#${id}`} style={{ margin: margin }} />
    </svg>
  );
  return (
    <Container>
      <LogoImg src={Logo} alt="로고" />
      <LoginBox>
        <KakaoLogin>
          <SocialSVG id="kakao" />
          카카오톡 계정으로 로그인
        </KakaoLogin>
        <GoogleLogin>
          <SocialSVG id="google" />
          구글 계정으로 로그인
        </GoogleLogin>
        <FacebookLogin>
          <SocialSVG id="facebook" />
          페이스북 계정으로 로그인
        </FacebookLogin>
        <LoginJoinBox>
          <EmailLogin to="/login">이메일로 로그인</EmailLogin>
          <Divider></Divider>
          <Join to="/signup">회원가입</Join>
        </LoginJoinBox>
      </LoginBox>
    </Container>
  );
}
