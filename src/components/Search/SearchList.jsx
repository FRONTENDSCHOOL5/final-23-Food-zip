import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDebounce } from "use-debounce";
import { useNavigate } from "react-router-dom";
import ErrorPage from "../../pages/Error/ErrorPage";

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

const UserID = styled.p`
  margin: 0;
  font-size: 12px;
  color: #767676;
`;

export default function SearchList({ searchKeyword }) {
  const navigate = useNavigate();
  function handleClick(accountname) {
    navigate(`/profile/${accountname}`);
  }
  const [searchListData, setSearchListData] = useState([]);
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500); // 500ms 디바운스 적용

  useEffect(() => {
    const fetchData = async () => {
      if (!debouncedSearchKeyword) {
        return;
      } else {
        try {
          const token = localStorage.getItem("token");
          console.log(debouncedSearchKeyword);
          const response = await axios.get(
            `https://api.mandarin.weniv.co.kr/user/searchuser/?keyword=${debouncedSearchKeyword}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json",
              },
            },
          );

          setSearchListData(response.data);
        } catch (error) {
          <ErrorPage />;
        }
      }
    };

    fetchData();
  }, [debouncedSearchKeyword]);

  console.log(searchListData);

  return (
    <SearchWrapper>
      {searchListData.map((searchItem, i) => (
        <List key={i} onClick={handleClick}>
          <ProfileImg src={searchItem.image} alt="프로필 이미지" />
          <TextWrap>
            <UserName>{searchItem.username}</UserName>
            <UserID>@ {searchItem.accountname}</UserID>
          </TextWrap>
        </List>
      ))}
    </SearchWrapper>
  );
}
