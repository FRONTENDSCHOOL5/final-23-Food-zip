import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import FullLogo from "../../assets/images/full-logo.svg";

const SplashWrapDiv = styled.div`
  width: 390px;
  height: 100vh;
  background-color: white;
  padding-top: ${props => props.paddingTop};
  box-sizing: border-box;
`;

const SplashImg = styled.img`
  display: block;
  margin: 0 auto;
`;

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      // 3초 후에 다른 페이지로 이동
      navigate("/welcome");
    }, 1500);

    return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머를 정리(clean-up)
  }, [navigate]);

  const [paddingTop, setPaddingTop] = useState("65%");

  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight;
      const dynamicPaddingTop = `${windowHeight * 0.35}px`;
      setPaddingTop(dynamicPaddingTop);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <SplashWrapDiv paddingTop={paddingTop}>
      <SplashImg src={FullLogo} alt="" />
    </SplashWrapDiv>
  );
}
