import styled from "styled-components";
import { Link } from "react-router-dom";

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
  display: flex;
  width: 322px;
  height: 45px;
  text-align: center;
  color: #767676;
  border: 1px solid #f2c94c;
  border-radius: 44px;
  align-items: center;
  gap: 52px;
  padding-left: 17px;
`;
const GoogleLogin = styled.button`
  display: flex;
  width: 322px;
  height: 45px;
  text-align: center;
  color: #767676;
  border: 1px solid #767676;
  border-radius: 44px;
  align-items: center;
  gap: 52px;
  padding-left: 17px;
`;
const FacebookLogin = styled.button`
  display: flex;
  width: 322px;
  height: 45px;
  text-align: center;
  color: #767676;
  border: 1px solid #2d9cdb;
  border-radius: 44px;
  padding: 13px 87px;
  align-items: center;
  gap: 52px;
  padding-left: 17px;
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

export {
  Container,
  LogoImg,
  LoginBox,
  KakaoLogin,
  GoogleLogin,
  FacebookLogin,
  LoginJoinBox,
  EmailLogin,
  Join,
  Divider,
};
