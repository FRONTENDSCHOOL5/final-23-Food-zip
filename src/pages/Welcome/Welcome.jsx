import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/symbol-logo-white.svg";
import KakaoLogo from "../../assets/images/kakao.svg";
import GoogleLogo from "../../assets/images/Google.svg";
import FacebookLogo from "../../assets/images/facebook.svg";

const Container = styled.div`
  max-width: 390px;
  height: 100vh;
  background: #286140;
  margin: 0 auto;
  position: relative;
`;
const LogoImg = styled.img`
  width: 130px;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const LoginBox = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background: #fff;
  padding: 51px 34px;
  border-top-left-radius: 28px;
  border-top-right-radius: 28px;
  position: absolute;
  bottom: 0;
`;
const KakaoLogin = styled.button`
  width: 322px;
  text-align: center;
  color: #767676;
  border: 1px solid #f2c94c;
  border-radius: 44px;
  padding: 13px 87px;
  background: url(${KakaoLogo}) no-repeat 12px 9px;
`;
const GoogleLogin = styled.button`
  width: 322px;
  text-align: center;
  color: #767676;
  border: 1px solid #767676;
  border-radius: 44px;
  padding: 13px 87px;
  background: url(${GoogleLogo}) no-repeat 12px 9px;
`;
const FacebookLogin = styled.button`
  width: 322px;
  text-align: center;
  color: #767676;
  border: 1px solid #2d9cdb;
  border-radius: 44px;
  padding: 13px 87px;
  background: url(${FacebookLogo}) no-repeat 12px 9px;
`;
const LoginJoinBox = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 10px;
`;
const EmailLogin = styled(Link)`
  color: #767676;
  font-size: 12px;
`;
const Join = styled(Link)`
  color: #767676;
  font-size: 12px;
`;
const Divider = styled.span`
  width: 1px;
  height: 10px;
  background-color: #c4c4c4;
`;
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
