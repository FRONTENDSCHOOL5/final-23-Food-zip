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
} from "./HeaderStyle";
import IconSearch from "../../../assets/images/icon-search.svg";
import IconArrowLeft from "../../../assets/images/icon-arrow-left.svg";
import IconMoreVertical from "../../../assets/images/icon-more-vertical.svg";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import RandomRecommend from "../../RandomRecommend/RandomRecommend";
import { useRecoilState } from "recoil";
import {
  randomFoodState,
  isAnimationActiveState,
} from "../../../atoms/randomFoodAtom";

export default function Header({
  type,
  modalOpen,
  uploadHandler,
  searchKeyword,
  handleSearchKeyword,
  handleSaveBtn,
  handleUploadBtn,
  yourAccountname,
}) {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/search");
  }

  const [randomShow, setRandomShow] = useState(false);
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
    setRandomShow(true);
    handleRecommendation();
    setTimeout(() => {
      setRandomShow(false);
    }, 6800);
  }
  function renderHeaderLeftBtn() {
    return (
      <HeaderLeftBtn type="button">
        <img
          src={IconArrowLeft}
          alt="뒤로가기 아이콘"
          onClick={() => navigate(-1)}
        />
      </HeaderLeftBtn>
    );
  }
  function renderHeaderText(text) {
    return (
      <HeaderSpan>
        <HeaderLeftBtn type="button">
          <img
            src={IconArrowLeft}
            alt="뒤로가기 아이콘"
            onClick={() => navigate(-1)}
          />
        </HeaderLeftBtn>
        <HeaderTextP>{text}</HeaderTextP>
      </HeaderSpan>
    );
  }

  function renderHeaderRightBtn() {
    return (
      <HeaderRightBtn type="button" onClick={modalOpen}>
        <img src={IconMoreVertical} alt="더보기 아이콘" />
      </HeaderRightBtn>
    );
  }

  const UI = {
    home: (
      <HeaderLayoutSection>
        <HeaderTitle>FOODZIP</HeaderTitle>
        <HeaderLogoBtn type="button" onClick={randomOpen} />
        <HeaderRightBtn type="button">
          <img src={IconSearch} alt="돋보기 아이콘" onClick={handleClick} />
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
    // save: (
    //   <HeaderLayoutDiv>
    //     <HeaderLeftBtn type="button">
    //       <img
    //         src={IconArrowLeft}
    //         alt="뒤로가기 아이콘"
    //         onClick={() => navigate(-1)}
    //       />
    //     </HeaderLeftBtn>
    //     <Button
    //       type="submit"
    //       content="저장"
    //       size="ms"
    //       width="ms"
    //       bgColor="inactive"
    //       onClick={handleSaveBtn}
    //     ></Button>
    //   </HeaderLayoutDiv>
    // ),
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
