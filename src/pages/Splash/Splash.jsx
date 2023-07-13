import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FullLogo from "../../assets/images/full-logo.svg";
import {
  BounceContainer,
  BounceLetter,
  SplashWrapDiv,
  SplashImg,
} from "./SplashStyle";

export default function Splash() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (token) {
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          navigate("/home");
        }, 500);
      }, 3000);
    } else {
      const timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          navigate("/welcome");
        }, 500);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [navigate, token]);

  const [paddingTop, setPaddingTop] = useState("65%");

  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight;
      const dynamicPaddingTop = `${windowHeight * 0.3}px`;
      setPaddingTop(dynamicPaddingTop);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <SplashWrapDiv paddingTop={paddingTop} fadeOut={fadeOut}>
      <h1 className="a11y-hidden">Splash 페이지</h1>
      <SplashImg src={FullLogo} alt="" />
      <BounceContainer>
        <BounceLetter>F</BounceLetter>
        <BounceLetter>O</BounceLetter>
        <BounceLetter>O</BounceLetter>
        <BounceLetter>D</BounceLetter>
        <BounceLetter>Z</BounceLetter>
        <BounceLetter>I</BounceLetter>
        <BounceLetter>P</BounceLetter>
      </BounceContainer>
    </SplashWrapDiv>
  );
}
