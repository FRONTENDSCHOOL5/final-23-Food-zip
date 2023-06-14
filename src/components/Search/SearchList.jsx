import React from "react";
import styled from "styled-components";
import foodzim from "../../assets/images/basic-profile-lg.svg";
import bear from "../../assets/images/chattest.jpg";
import gyul from "../../assets/images/list-example.png";
const SearchWrapper = styled.ul`
  padding: 0;
`;

const List = styled.li`
  list-style: none;
  display: flex;
  background-color: white;
  padding: 8px 16px;
  gap: 12px;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: white;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
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
  font-weight: 600;
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
  const searchListData = [
    {
      id: 1,
      profileImg: foodzim,
      result: "애월읍 ",
      userName: "위니브 감귤농장",
      userId: "@ weniv_Mandarin",
    },
    {
      id: 2,
      profileImg: bear,
      result: "애월읍 ",
      userName: "곰 농장",
      userId: "@ bear_farm",
    },
    {
      id: 3,
      profileImg: gyul,
      result: "애월읍 ",
      userName: "귤 과수원",
      userId: "@ gyul_farm",
    },
  ];
  return (
    <SearchWrapper>
      {searchListData.map(searchItem => (
        <List key={searchItem.id}>
          <ProfileImg src={searchItem.profileImg} alt="프로필 이미지" />
          <TextWrap>
            <UserName>
              <Result>{searchItem.result}</Result>
              {searchItem.userName}
            </UserName>
            <UserID>{searchItem.userId}</UserID>
          </TextWrap>
        </List>
      ))}
    </SearchWrapper>
  );
}
