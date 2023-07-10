import styled from "styled-components";

const SearchWrapper = styled.ul`
  padding: 0 0 60px 0;
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

export { SearchWrapper, List, ProfileImg, TextWrap, UserName, UserID };
