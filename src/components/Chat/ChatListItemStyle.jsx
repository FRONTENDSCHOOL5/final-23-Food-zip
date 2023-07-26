import styled from "styled-components";
const ChatWrapper = styled.ul`
  padding: 0;
`;

const List = styled.li`
  list-style: none;
  display: flex;
  padding: 8px 16px;
  gap: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: white;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const ProfileImg = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  position: relative;
`;

const ProfileDot = styled.span`
  content: "";
  position: absolute;
  top: 60px;
  width: 12px;
  height: 12px;
  background-color: #286140;
  border-radius: 50%;
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 5px;
`;

const UserName = styled.strong`
  font-size: 14px;
`;

const ChatContent = styled.p`
  margin: 0;
  font-size: 12px;
  color: #767676;
`;

const Date = styled.p`
  font-size: 10px;
  color: #dbdbdb;
  margin-left: auto;
  margin-top: auto;
`;
export {
  ChatWrapper,
  List,
  ProfileImg,
  ProfileDot,
  TextWrap,
  UserName,
  ChatContent,
  Date,
};
