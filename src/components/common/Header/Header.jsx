import React, { useState } from "react";
import {
  HeaderWrap,
  HeaderLayoutSection,
  HeaderTitle,
  HeaderLeftBtn,
  HeaderRightBtn,
  HeaderSearchInp,
  HeaderSpan,
  HeaderTextP,
  HeaderLogoBtn,
  SocialSvg,
} from "./HeaderStyle";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import RandomRecommend from "../../RandomRecommend/RandomRecommend";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  randomFoodState,
  isAnimationActiveState,
} from "../../../atoms/randomFoodAtom";
import sprite from "../../../assets/images/SpriteIcon.svg";
import { modalState } from "../../../atoms/modalAtom";

export default function Header({
  type,
  uploadHandler,
  searchKeyword,
  handleSearchKeyword,
  handleUploadBtn,
  yourAccountname,
}) {
  const SocialSVG = ({
    id,
    color = "white",
    size = 24,
    strokeColor = "#767676",
    onClick,
  }) => (
    <SocialSvg onClick={onClick}>
      <svg fill={color} width={size} height={size} stroke={strokeColor}>
        <use href={`${sprite}#${id}`} />
      </svg>
    </SocialSvg>
  );
  const navigate = useNavigate();
  function handleClick() {
    navigate("/search");
  }

  const [randomShow, setRandomShow] = useState(false);
  const [isRandomOpening, setIsRandomOpening] = useState(false);
  function randomClose(e) {
    if (e.target === e.currentTarget) {
      setRandomShow(false);
    }
  }
  const [randomFood, setRandomFood] = useRecoilState(randomFoodState);
  const [isAnimationActive, setIsAnimationActive] = useRecoilState(
    isAnimationActiveState,
  );
  const handleRecommendation = () => {
    setRandomFood("");
    setTimeout(() => {
      if (!isAnimationActive) {
        setRandomFood("");
        setIsAnimationActive(true);
      }
    }, 1200);
  };
  function randomOpen() {
    if (!isRandomOpening) {
      setIsRandomOpening(true);
      setRandomShow(true);
      handleRecommendation();
      setTimeout(() => {
        setRandomShow(false);
        setIsRandomOpening(false);
      }, 6800);
    }
  }
  const setModal = useSetRecoilState(modalState);
  const modalOpen = () => {
    setModal({ show: true, type: "setting" });
  };
  function renderHeaderLeftBtn() {
    return (
      <HeaderLeftBtn type="button" aria-label="뒤로가기 버튼">
        <SocialSVG id="icon-arrow-left" onClick={() => navigate(-1)} />
      </HeaderLeftBtn>
    );
  }
  function renderHeaderText(text) {
    return (
      <HeaderSpan>
        <HeaderLeftBtn type="button" aria-label="뒤로가기 버튼">
          <SocialSVG id="icon-arrow-left" onClick={() => navigate(-1)} />
        </HeaderLeftBtn>
        <HeaderTextP>{text}</HeaderTextP>
      </HeaderSpan>
    );
  }

  function renderHeaderRightBtn() {
    return (
      <HeaderRightBtn
        type="button"
        onClick={modalOpen}
        aria-label="더보기 버튼"
      >
        <SocialSVG id="icon-more-vertical" />
      </HeaderRightBtn>
    );
  }

  const UI = {
    home: (
      <HeaderLayoutSection>
        <HeaderTitle>FOODZIP</HeaderTitle>
        <HeaderLogoBtn
          type="button"
          onClick={randomOpen}
          aria-label="추천 음식 버튼"
        />

        <HeaderRightBtn type="button" aria-label="검색페이지 이동 버튼">
          <SocialSVG id="icon-search" onClick={handleClick} />
        </HeaderRightBtn>
      </HeaderLayoutSection>
    ),
    search: (
      <HeaderLayoutSection>
        <HeaderTitle className="a11y-hidden">Search</HeaderTitle>
        {renderHeaderLeftBtn()}
        <HeaderSearchInp
          type="text"
          placeholder="계정 검색"
          value={searchKeyword}
          onChange={handleSearchKeyword}
        />
      </HeaderLayoutSection>
    ),
    profile: (
      <HeaderLayoutSection>
        <HeaderTitle className="a11y-hidden">프로필</HeaderTitle>
        {renderHeaderLeftBtn()}
        {renderHeaderRightBtn()}
      </HeaderLayoutSection>
    ),
    followers: (
      <HeaderLayoutSection>
        <HeaderTitle className="a11y-hidden">팔로워</HeaderTitle>
        {renderHeaderText("Followers")}
      </HeaderLayoutSection>
    ),
    followings: (
      <HeaderLayoutSection>
        <HeaderTitle className="a11y-hidden">팔로잉</HeaderTitle>
        {renderHeaderText("Followings")}
      </HeaderLayoutSection>
    ),
    upload: (
      <HeaderLayoutSection>
        <HeaderTitle className="a11y-hidden">게시물 작성</HeaderTitle>
        {renderHeaderLeftBtn()}
        <Button
          type="button"
          content="업로드"
          size="ms"
          width="ms"
          bgColor={handleUploadBtn ? "active" : "inactive"}
          disabled={!handleUploadBtn}
          onClick={uploadHandler}
        ></Button>
      </HeaderLayoutSection>
    ),
    chat: (
      <HeaderLayoutSection>
        <HeaderTitle className="a11y-hidden">채팅</HeaderTitle>
        {renderHeaderText(`@ ${yourAccountname}`)}
        {renderHeaderRightBtn()}
      </HeaderLayoutSection>
    ),
    map: (
      <HeaderLayoutSection>
        <HeaderTitle className="a11y-hidden">카카오맵</HeaderTitle>
        {renderHeaderText("카카오맵")}
        {renderHeaderRightBtn()}
      </HeaderLayoutSection>
    ),
    default: (
      <HeaderLayoutSection>
        <HeaderTitle className="a11y-hidden">프로필 수정</HeaderTitle>
        {renderHeaderText()}
      </HeaderLayoutSection>
    ),
  };

  return (
    <>
      <HeaderWrap>{UI[type]}</HeaderWrap>
      {randomShow && <RandomRecommend randomClose={randomClose} />}
    </>
  );
}
