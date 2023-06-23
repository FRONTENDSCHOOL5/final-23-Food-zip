import React, { useState } from "react";
import styled from "styled-components";
import IconSearch from "../../../assets/images/icon-search.svg";
import IconArrowLeft from "../../../assets/images/icon-arrow-left.svg";
import IconMoreVertical from "../../../assets/images/icon-more-vertical.svg";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

const HeaderWrap = styled.header`
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  max-width: 390px;
`;

const HeaderLayoutDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  padding: 0px 16px;
  border-bottom: 1px solid #dbdbdb;
  box-sizing: border-box;
  background-color: white;
`;

const HeaderTitleP = styled.p`
  font-size: 18px;
  font-weight: 600;
`;

const HeaderLeftBtn = styled.button`
  border: 0;
  padding: 10px;
  padding-left: 0;
  background-color: transparent;
`;

const HeaderRightBtn = styled.button`
  border: 0;
  padding: 10px;
  padding-right: 0;
  background-color: transparent;
`;

const HeaderSearchInp = styled.input`
  width: 316px;
  background-color: #f2f2f2;
  border: 0;
  border-radius: 32px;
  padding: 7px 16px;
  font-size: 14px;
  box-sizing: border-box;
  &:focus {
    outline: 0;
  }
  &::placeholder {
    color: #c4c4c4;
  }
`;

const HeaderSpan = styled.span`
  display: flex;
  align-items: center;
`;

const HeaderTextP = styled.p`
  display: inline-block;
  margin-left: 8px;
  font-size: 14px;
  font-weight: 600;
`;

export default function Header({
  type,
  modalOpen,
  uploadHandler,
  searchKeyword,
  handleSearchKeyword,
  handleSaveBtn,
  handleUploadBtn,
}) {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/search");
  }
  console.log(handleUploadBtn);
  const UI = {
    home: (
      <HeaderLayoutDiv>
        <HeaderTitleP>FOODZIP 피드</HeaderTitleP>
        <HeaderRightBtn type="button">
          <img src={IconSearch} alt="돋보기 아이콘" onClick={handleClick} />
        </HeaderRightBtn>
      </HeaderLayoutDiv>
    ),
    search: (
      <HeaderLayoutDiv>
        <HeaderLeftBtn type="button">
          <img
            src={IconArrowLeft}
            alt="뒤로가기 아이콘"
            onClick={() => navigate(-1)}
          />
        </HeaderLeftBtn>
        <HeaderSearchInp
          type="text"
          placeholder="계정 검색"
          value={searchKeyword}
          onChange={handleSearchKeyword}
        />
      </HeaderLayoutDiv>
    ),
    profile: (
      <HeaderLayoutDiv>
        <HeaderLeftBtn type="button">
          <img
            src={IconArrowLeft}
            alt="뒤로가기 아이콘"
            onClick={() => navigate(-1)}
          />
        </HeaderLeftBtn>
        <HeaderRightBtn type="button" onClick={modalOpen}>
          <img src={IconMoreVertical} alt="더보기 아이콘" />
        </HeaderRightBtn>
      </HeaderLayoutDiv>
    ),
    followers: (
      <HeaderLayoutDiv>
        <HeaderSpan>
          <HeaderLeftBtn type="button">
            <img
              src={IconArrowLeft}
              alt="뒤로가기 아이콘"
              onClick={() => navigate(-1)}
            />
          </HeaderLeftBtn>
          <HeaderTextP>Followers</HeaderTextP>
        </HeaderSpan>
      </HeaderLayoutDiv>
    ),
    followings: (
      <HeaderLayoutDiv>
        <HeaderSpan>
          <HeaderLeftBtn type="button">
            <img
              src={IconArrowLeft}
              alt="뒤로가기 아이콘"
              onClick={() => navigate(-1)}
            />
          </HeaderLeftBtn>
          <HeaderTextP>Followings</HeaderTextP>
        </HeaderSpan>
      </HeaderLayoutDiv>
    ),
    save: (
      <HeaderLayoutDiv>
        <HeaderLeftBtn type="button">
          <img
            src={IconArrowLeft}
            alt="뒤로가기 아이콘"
            onClick={() => navigate(-1)}
          />
        </HeaderLeftBtn>
        <Button
          type="submit"
          content="저장"
          size="ms"
          width="ms"
          bgColor="inactive"
          onClick={handleSaveBtn}
        ></Button>
      </HeaderLayoutDiv>
    ),
    upload: (
      <HeaderLayoutDiv>
        <HeaderLeftBtn type="button">
          <img
            src={IconArrowLeft}
            alt="뒤로가기 아이콘"
            onClick={() => navigate(-1)}
          />
        </HeaderLeftBtn>
        <Button
          type="button"
          content="업로드"
          size="ms"
          width="ms"
          bgColor={handleUploadBtn ? "active" : "inactive"}
          disabled={!handleUploadBtn}
          onClick={uploadHandler}
        ></Button>
      </HeaderLayoutDiv>
    ),
    chat: (
      <HeaderLayoutDiv>
        <HeaderSpan>
          <HeaderLeftBtn type="button">
            <img
              src={IconArrowLeft}
              alt="뒤로가기 아이콘"
              onClick={() => navigate(-1)}
            />
          </HeaderLeftBtn>
          <HeaderTextP>푸짐가게</HeaderTextP>
        </HeaderSpan>
        <HeaderRightBtn type="button" onClick={modalOpen}>
          <img src={IconMoreVertical} alt="더보기 아이콘" />
        </HeaderRightBtn>
      </HeaderLayoutDiv>
    ),
    map: (
      <HeaderLayoutDiv>
        <HeaderSpan>
          <HeaderLeftBtn type="button">
            <img
              src={IconArrowLeft}
              alt="뒤로가기 아이콘"
              onClick={() => navigate(-1)}
            />
          </HeaderLeftBtn>
          <HeaderTextP>카카오지도</HeaderTextP>
        </HeaderSpan>
        <HeaderRightBtn type="button" onClick={modalOpen}>
          <img src={IconMoreVertical} alt="더보기 아이콘" />
        </HeaderRightBtn>
      </HeaderLayoutDiv>
    ),
  };

  return <HeaderWrap>{UI[type]}</HeaderWrap>;
}
