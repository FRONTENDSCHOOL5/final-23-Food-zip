import React from "react";
import styled from "styled-components";
import foodzim from "../../assets/images/basic-profile-lg.svg";

const SearchWrapper = styled.ul`
  padding: 0;
`;

const List = styled.li`
  list-style: none;
  display: flex;
  padding: 8px 16px;
  gap: 12px;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const ProfileImg = styled.img`
  width: 50px;
  border-radius: 50%;
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
`;

const UserName = styled.strong`
  font-size: 14px;
`;
const Result = styled.span`
  color: #286140;
`;
const UserID = styled.p`
  margin: 0;
  font-size: 12px;
  color: #767676;
`;

export default function SearchList() {
  return (
    <SearchWrapper>
      <List>
        <ProfileImg src={foodzim} alt="프로필 이미지" />
        <TextWrap>
          <UserName>
            <Result>애월읍</Result> 위니브 감귤농장
          </UserName>
          <UserID>@ weniv_Mandarin</UserID>
        </TextWrap>
      </List>
    </SearchWrapper>
  );
}
