import React from "react";
import styled from "styled-components";
import IconSearch from "../../assets/images/icon-search.svg";
import IconArrowLeft from "../../assets/images/icon-arrow-left.svg";
import IconMoreVertical from "../../assets/images/icon-more-vertical.svg";

const HeaderWrap = styled.header`
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100%;
`;

const HeaderLayoutDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 390px;
  height: 48px;
  padding: 0px 16px;
  border-bottom: 1px solid #dbdbdb;
  box-sizing: border-box;
`;

const HeaderTitleP = styled.p`
  font-size: 18px;
  font-weight: 600;
`;

const HeaderSearchBtn = styled.button`
  background-color: transparent;
  border: 0;
  padding: 2px 6px;
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

const HeaderTextP = styled.p`
  display: inline-block;
  line-height: 22px;
  margin-left: 8px;
  font-size: 14px;
  font-weight: 600;
`;

const HeaderSaveBtn = styled.button`
  width: 90px;
  height: 32px;
  color: #fff;
  border: 0;
  border-radius: 32px;
  background-color: ${({ active }) => (active ? "#286140" : "#629678")};
`;

export default function Header({ type, active }) {
  const UI = {
    home: (
      <HeaderLayoutDiv>
        <HeaderTitleP>FOODZIP 피드</HeaderTitleP>
        <HeaderSearchBtn type="button">
          <img src={IconSearch} alt="돋보기 아이콘" />
        </HeaderSearchBtn>
      </HeaderLayoutDiv>
    ),
    search: (
      <HeaderLayoutDiv>
        <img src={IconArrowLeft} alt="뒤로가기 아이콘" />
        <HeaderSearchInp type="text" placeholder="계정 검색" />
      </HeaderLayoutDiv>
    ),
    profile: (
      <HeaderLayoutDiv>
        <img src={IconArrowLeft} alt="뒤로가기 아이콘" />
        <img src={IconMoreVertical} alt="더보기 아이콘" />
      </HeaderLayoutDiv>
    ),
    followers: (
      <HeaderLayoutDiv>
        <span>
          <img src={IconArrowLeft} alt="뒤로가기 아이콘" />
          <HeaderTextP>Followers</HeaderTextP>
        </span>
      </HeaderLayoutDiv>
    ),
    save: (
      <HeaderLayoutDiv>
        <img src={IconArrowLeft} alt="뒤로가기 아이콘" />
        <HeaderSaveBtn type="button" active={active}>
          저장
        </HeaderSaveBtn>
      </HeaderLayoutDiv>
    ),
    upload: (
      <HeaderLayoutDiv>
        <img src={IconArrowLeft} alt="뒤로가기 아이콘" />
        <HeaderSaveBtn type="button" active={active}>
          업로드
        </HeaderSaveBtn>
      </HeaderLayoutDiv>
    ),
    chat: (
      <HeaderLayoutDiv>
        <span>
          <img src={IconArrowLeft} alt="뒤로가기 아이콘" />
          <HeaderTextP>애월읍 위니브 감귤농장</HeaderTextP>
        </span>
        <img src={IconMoreVertical} alt="더보기 아이콘" />
      </HeaderLayoutDiv>
    ),
  };
  return <HeaderWrap>{UI[type]}</HeaderWrap>;
}
